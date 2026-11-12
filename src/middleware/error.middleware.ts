import { NextFunction, Response, Request } from 'express';
import { AppError } from '../errors/AppError';
import { Prisma } from '../../generated/prisma/client';

const prismaErrors: Record<string, { status: number; message: string }> = {
  P2002: { status: 409, message: 'User already exists' },
  P2025: { status: 404, message: 'Record not found' },
  P2003: { status: 400, message: 'Related record does not exist' },
  P2000: { status: 400, message: 'Value too long' },
  P2007: { status: 400, message: 'Invalid input' },
};

async function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Error && 'code' in err && err.code === 'ECONNREFUSED') {
    return res.status(503).json({ message: 'Service temporarily unavailable' });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    prismaErrors[err.code]
  ) {
    const { status, message } = prismaErrors[err.code];
    return res.status(status).json({ message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}

export { globalErrorHandler };
