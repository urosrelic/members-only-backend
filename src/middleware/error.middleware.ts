import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/AppError";

async function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
  });
}

export { globalErrorHandler };
