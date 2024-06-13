export class ResponseDto<T> {
  message: string;
  data: T;
}

export function createResponse<T>(data: T, message: string): ResponseDto<T> {
  return { data, message };
}
