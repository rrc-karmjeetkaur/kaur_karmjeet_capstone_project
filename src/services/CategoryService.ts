import Joi from 'joi';
import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

const categoryCreateSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow('', null),
});

const categoryUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  description: Joi.string().allow('', null).optional(),
}).min(1);

export class CategoryService {
  private repo: CategoryRepository;

  constructor() {
    this.repo = new CategoryRepository();
  }

  async createCategory(userId: string, payload: any): Promise<Category> {
    const { error, value } = categoryCreateSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }

    return this.repo.createCategory({
      userId,
      name: value.name,
      description: value.description,
    });
  }

  async getCategoriesByUser(userId: string): Promise<Category[]> {
    return this.repo.getCategoriesByUser(userId);
  }

  async getCategoryById(id: string, userId: string): Promise<Category | null> {
    return this.repo.getCategoryById(id, userId);
  }

  async updateCategory(
    id: string,
    userId: string,
    payload: Partial<Category>
  ): Promise<Category | null> {
    const { error, value } = categoryUpdateSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }

    return this.repo.updateCategory(id, userId, value);
  }

  async deleteCategory(id: string, userId: string): Promise<boolean> {
    return this.repo.deleteCategory(id, userId);
  }
}