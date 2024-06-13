import { UnprocessableEntityException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

interface DriverError extends Error {
  length: number;
  code: string;
  severity: string;
  detail: string;
  schema: string;
  table: string;
  constraint: string;
  file: string;
  line: string;
  routine: string;
}

const mapQueryErrorMessage = (error: QueryFailedError) => {
  const dbError = error.driverError as DriverError;
  if (dbError.code === '23505') {
    return dbError.detail;
  }
};

export default function handleDBError(error: Error) {
  if (error instanceof QueryFailedError) {
    throw new UnprocessableEntityException(mapQueryErrorMessage(error));
  }
}
