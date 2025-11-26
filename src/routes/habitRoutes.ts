import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  getHabitStreak,
} from '../controllers/HabitController';

const router = Router();

// Protect all habit routes with auth
router.use(authMiddleware);

// GET /api/habits - list all habits for user
router.get('/', getHabits);

// POST /api/habits - create habit
router.post('/', createHabit);

// GET /api/habits/:id - get habit by id
router.get('/:id', getHabitById);

// PATCH /api/habits/:id - update habit
router.patch('/:id', updateHabit);

// DELETE /api/habits/:id - delete habit
router.delete('/:id', deleteHabit);

// GET /api/habits/:id/streak - get streak
router.get('/:id/streak', getHabitStreak);

export default router;