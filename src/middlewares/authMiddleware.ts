import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header exists and starts with Bearer
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    // 2. Here TypeScript knows token is definitely a string
    const decoded = await admin.auth().verifyIdToken(token);

    // 3. Attach user to request
    req.user = decoded;

    return next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};