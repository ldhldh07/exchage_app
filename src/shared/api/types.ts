export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface ApiErrorData {
  [key: string]: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  data: ApiErrorData | null;
}
