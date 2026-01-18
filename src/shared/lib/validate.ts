import { z } from "zod";
import { ValidationError } from "./errors";

/**
 * Zod 스키마를 사용하여 데이터를 검증합니다.
 * 검증 실패 시 ValidationError를 throw합니다.
 */
export const validateSchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  errorMessage: string,
): z.infer<T> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(errorMessage, result.error.issues);
  }

  return result.data;
};
