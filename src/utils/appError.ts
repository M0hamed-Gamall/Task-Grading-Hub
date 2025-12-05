class AppError extends Error {
  statusCode: number;
  statusText: string;

  constructor(message?: string, statusCode?: number, statusText?: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.statusText = statusText || "error";

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
