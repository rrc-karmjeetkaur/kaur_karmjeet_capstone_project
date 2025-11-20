import { Request, Response } from 'express';

export const getStatus = (_req: Request, res: Response) => {
  res.json({ message: 'Daily Habit Tracker API is running!' });
};
