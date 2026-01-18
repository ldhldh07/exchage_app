interface RetryOptions {
  maxRetries?: number;
  delayBase?: number;
  shouldRetry?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
  signal?: AbortSignal;
}

type RetryResult<T> = 
  | { success: true; data: T }
  | { success: false; error: unknown; attempts: number };

const DEFAULT_OPTIONS: Required<Omit<RetryOptions, 'signal' | 'shouldRetry' | 'onRetry'>> = {
  maxRetries: 3,
  delayBase: 1000,
};

const delay = (ms: number, signal?: AbortSignal): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
};

/**
 * 함수를 지수 백오프로 재시도
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<RetryResult<T>> {
  const { maxRetries, delayBase } = { ...DEFAULT_OPTIONS, ...options };
  const { shouldRetry, onRetry, signal } = options || {};

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (signal?.aborted) {
        return { success: false, error: new DOMException('Aborted', 'AbortError'), attempts: attempt };
      }

      if (attempt > 0) {
        onRetry?.(attempt, lastError);
        const delayMs = delayBase * Math.pow(2, attempt - 1);
        await delay(delayMs, signal);
      }

      const result = await fn();
      return { success: true, data: result };
    } catch (error) {
      lastError = error;

      if (shouldRetry && !shouldRetry(error)) {
        break;
      }
    }
  }

  return { success: false, error: lastError, attempts: maxRetries + 1 };
}

/**
 * 결과 객체 기반 재시도 (Server Action용)
 */
export async function withRetryResult<T extends { success: boolean; error?: string; errorCode?: string }>(
  fn: () => Promise<T>,
  options?: Omit<RetryOptions, 'shouldRetry'> & {
    shouldRetry?: (result: T) => boolean;
  }
): Promise<{ result: T; attempts: number }> {
  const { maxRetries, delayBase } = { ...DEFAULT_OPTIONS, ...options };
  const { shouldRetry, onRetry, signal } = options || {};

  if (signal?.aborted) {
    return { 
      result: { success: false, error: 'Aborted' } as T, 
      attempts: 0 
    };
  }

  let lastResult: T = await fn();
  
  if (lastResult.success) {
    return { result: lastResult, attempts: 1 };
  }

  if (shouldRetry && !shouldRetry(lastResult)) {
    return { result: lastResult, attempts: 1 };
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) {
      return { result: lastResult, attempts: attempt };
    }

    onRetry?.(attempt, lastResult);
    const delayMs = delayBase * Math.pow(2, attempt - 1);
    try {
      await delay(delayMs, signal);
    } catch {
      return { result: lastResult, attempts: attempt };
    }

    lastResult = await fn();

    if (lastResult.success) {
      return { result: lastResult, attempts: attempt + 1 };
    }

    if (shouldRetry && !shouldRetry(lastResult)) {
      break;
    }
  }

  return { result: lastResult, attempts: maxRetries + 1 };
}
