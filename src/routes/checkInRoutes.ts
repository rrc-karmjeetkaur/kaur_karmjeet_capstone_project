import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createCheckIn,
  getCheckInsForHabit,
  getCheckInById,
  updateCheckIn,
  deleteCheckIn,
} from '../controllers/CheckInController';

const router = Router();

router.use(authMiddleware);

// POST /api/check-ins - create a new check-in
router.post('/', createCheckIn);

// GET /api/check-ins/habit/:habitId - list check-ins for a habit
router.get('/habit/:habitId', getCheckInsForHabit);

// GET /api/check-ins/:id - get single check-in
router.get('/:id', getCheckInById);

// PATCH /api/check-ins/:id - update check-in
router.patch('/:id', updateCheckIn);

// DELETE /api/check-ins/:id - delete check-in
router.delete('/:id', deleteCheckIn);

export default router;