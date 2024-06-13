export interface ResponseDto<T> {
  message?: string;
  data: T;
}

export function createResponse<T>(
  data: T,
  message: string = 'OK',
): ResponseDto<T> {
  return { data, message };
}
