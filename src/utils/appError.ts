// A custom error type for errors we create ON PURPOSE — like
// "user not found" or "email already taken". Extends the built-in
// Error class so it still works with throw/try-catch like normal,
// but adds extra info an HTTP response needs.
export class AppError extends Error {
  // Which HTTP status code this error should respond with (404, 400, etc).
  public readonly statusCode: number;

  // Marks this as an error we EXPECTED could happen (as opposed to
  // a random bug/crash). Always true here, since we only reach this
  // class when we're deliberately throwing it ourselves.
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // hands the message up to the built-in Error class
    this.statusCode = statusCode;
    this.isOperational = true;

    // Cleans up the stack trace so it points to where we actually
    // threw the error in our code, not to this constructor itself.
    Error.captureStackTrace(this, this.constructor);
  }

  // Shortcut methods below — so instead of writing
  // `new AppError("message", 404)` everywhere and having to
  // remember which number means what, we just write
  // `AppError.notFound("message")`.

  static notFound(message = "Resource not found") {
    return new AppError(message, 404);
  }

  static badRequest(message = "Bad request") {
    return new AppError(message, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new AppError(message, 403);
  }
  static conflict(message: string = "Conflict") {
    return new AppError(message, 409);
  }
}
