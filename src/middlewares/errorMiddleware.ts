import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: any,
  _req: Request,          
  res: Response,
  _next: NextFunction      
): void => {
  console.error('API Error:', err);

  const status = (err && err.status) || 500;

  res.status(status).json({
    success: false,
    message: err?.message || 'Internal Server Error',
  });
};