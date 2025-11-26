import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { CategoryService } from '../services/CategoryService';

const categoryService = new CategoryService();

export const createCategory = async (
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
    const category = await categoryService.createCategory(userId, req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (
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
    const categories = await categoryService.getCategoriesByUser(userId);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
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
      res.status(400).json({ error: 'Category id is required' });
      return;
    }

    const category = await categoryService.getCategoryById(id, userId);

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
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
      res.status(400).json({ error: 'Category id is required' });
      return;
    }

    const updated = await categoryService.updateCategory(id, userId, req.body);

    if (!updated) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
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
      res.status(400).json({ error: 'Category id is required' });
      return;
    }

    const deleted = await categoryService.deleteCategory(id, userId);

    if (!deleted) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};