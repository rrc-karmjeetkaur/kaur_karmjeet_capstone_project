import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { HabitService } from '../services/HabitService';

const habitService = new HabitService();

export const createHabit = async (
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
    const habit = await habitService.createHabit(userId, req.body);
    res.status(201).json(habit);
  } catch (err) {
    next(err);
  }
};

export const getHabits = async (
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

    // 🔹 Advanced feature: filtering + sorting from query params
    const { categoryId, sort, order } = req.query;

    const options: {
      categoryId?: string;
      sort?: 'name' | 'createdAt';
      order?: 'asc' | 'desc';
    } = {};

    if (typeof categoryId === 'string') {
      options.categoryId = categoryId;
    }

    if (sort === 'name' || sort === 'createdAt') {
      options.sort = sort;
    }

    if (order === 'desc' || order === 'asc') {
      options.order = order;
    } else {
      options.order = 'asc'; // default
    }

    const habits = await habitService.getUserHabits(userId, options);

    res.json(habits);
  } catch (err) {
    next(err);
  }
};

export const getHabitById = async (
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
      res.status(400).json({ error: 'Habit id is required' });
      return;
    }

    const habit = await habitService.getHabitById(id, userId);

    if (!habit) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.json(habit);
  } catch (err) {
    next(err);
  }
};

export const updateHabit = async (
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
      res.status(400).json({ error: 'Habit id is required' });
      return;
    }

    const updated = await habitService.updateHabit(id, userId, req.body);

    if (!updated) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteHabit = async (
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
      res.status(400).json({ error: 'Habit id is required' });
      return;
    }

    const deleted = await habitService.deleteHabit(id, userId);

    if (!deleted) {
      res.status(404).json({ error: 'Habit not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getHabitStreak = async (
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
      res.status(400).json({ error: 'Habit id is required' });
      return;
    }

    const streak = await habitService.getHabitStreak(id, userId);
    res.json({ habitId: id, streak });
  } catch (err) {
    next(err);
  }
};