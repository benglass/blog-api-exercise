export class APIError extends Error {
  // TODO: Stricter status codes, only support http ones 400+
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}
