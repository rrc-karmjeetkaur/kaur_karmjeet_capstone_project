import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 API Error:', err);

  // If error has a defined status code (e.g., validation error)
  const status = err.status || 500;

  // Send clean JSON response
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Optional: include stack for development only
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};