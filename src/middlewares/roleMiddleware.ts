import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const role = (req.user as any).role || (req.user as any)['https://example.com/role'];

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient role' });
      return;
    }

    next();
  };
};