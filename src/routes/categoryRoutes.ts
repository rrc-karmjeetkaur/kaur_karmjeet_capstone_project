import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/CategoryController';

const router = Router();

router.use(authMiddleware);

// GET /api/categories - list categories
router.get('/', getCategories);

// POST /api/categories - create
router.post('/', createCategory);

// GET /api/categories/:id
router.get('/:id', getCategoryById);

// PATCH /api/categories/:id
router.patch('/:id', updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

export default router;