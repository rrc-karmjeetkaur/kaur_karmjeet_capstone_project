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

/**
 * @swagger
 * tags:
 *   name: Habits
 *   description: Habit management endpoints
 */

// Protect all habit routes with auth
router.use(authMiddleware);

/**
 * @swagger
 * /api/habits:
 *   get:
 *     summary: Get all habits for the current user
 *     tags: [Habits]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter habits by categoryId
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *         required: false
 *         description: Sort habits by name or creation date
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         required: false
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of habits returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getHabits);

/**
 * @swagger
 * /api/habits:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, frequency]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Habit created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', createHabit);

/**
 * @swagger
 * /api/habits/{id}:
 *   get:
 *     summary: Get a habit by ID
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The habit ID
 *     responses:
 *       200:
 *         description: Habit found
 *       404:
 *         description: Habit not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getHabitById);

/**
 * @swagger
 * /api/habits/{id}:
 *   patch:
 *     summary: Update an existing habit
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       404:
 *         description: Habit not found
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id', updateHabit);

/**
 * @swagger
 * /api/habits/{id}:
 *   delete:
 *     summary: Delete a habit
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Habit deleted successfully
 *       404:
 *         description: Habit not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteHabit);

/**
 * @swagger
 * /api/habits/{id}/streak:
 *   get:
 *     summary: Get habit streak count
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The habit ID
 *     responses:
 *       200:
 *         description: Streak returned successfully
 *       404:
 *         description: Habit not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id/streak', getHabitStreak);

export default router;
