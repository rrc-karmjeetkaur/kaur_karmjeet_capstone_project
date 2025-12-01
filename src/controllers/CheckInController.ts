import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { CheckInService } from '../services/CheckInService';

const checkInService = new CheckInService();

export const createCheckIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.uid;
    const checkIn = await checkInService.createCheckIn(userId, req.body);
    res.status(201).json(checkIn);
  } catch (err) {
    next(err);
  }
};

// GET /api/check-ins/habit/:habitId
export const getCheckInsForHabit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.uid;
    const { habitId } = req.params;

    if (!habitId) {
      res.status(400).json({ error: 'habitId is required' });
      return;
    }

    const checkIns = await checkInService.getCheckInsForHabit(habitId, userId);
    res.json(checkIns);
  } catch (err) {
    next(err);
  }
};

export const getCheckInById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.uid;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Check-in id is required' });
      return;
    }

    const checkIn = await checkInService.getCheckInById(id, userId);

    if (!checkIn) {
      res.status(404).json({ error: 'Check-in not found' });
      return;
    }

    res.json(checkIn);
  } catch (err) {
    next(err);
  }
};

export const updateCheckIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.uid;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Check-in id is required' });
      return;
    }

    const updated = await checkInService.updateCheckIn(id, userId, req.body);

    if (!updated) {
      res.status(404).json({ error: 'Check-in not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCheckIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userId = req.user.uid;
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Check-in id is required' });
      return;
    }

    const deleted = await checkInService.deleteCheckIn(id, userId);

    if (!deleted) {
      res.status(404).json({ error: 'Check-in not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};