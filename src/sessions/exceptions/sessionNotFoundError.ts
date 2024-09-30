export class SessionNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? '');
  }
}
