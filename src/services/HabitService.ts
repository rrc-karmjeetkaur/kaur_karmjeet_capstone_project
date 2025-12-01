import Joi from 'joi';
import { Habit } from '../models/Habit';
import { HabitRepository } from '../repositories/HabitRepository';
import { CheckInRepository } from '../repositories/CheckInRepository';
import { CheckIn } from '../models/CheckIn';

const habitCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('', null),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  categoryId: Joi.string().optional(),
});

export class HabitService {
  private habitRepo: HabitRepository;
  private checkInRepo: CheckInRepository;

  constructor() {
    this.habitRepo = new HabitRepository();
    this.checkInRepo = new CheckInRepository();
  }

  async createHabit(userId: string, payload: any): Promise<Habit> {
    const { error, value } = habitCreateSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }

    const now = new Date().toISOString();

    return this.habitRepo.createHabit({
      userId,
      name: value.name,
      description: value.description,
      frequency: value.frequency,
      categoryId: value.categoryId,
      createdAt: now,
      updatedAt: now,
    });
  }

  
  async getUserHabits(
    userId: string,
    options?: {
      categoryId?: string;
      sort?: 'createdAt' | 'name';
      order?: 'asc' | 'desc';
    }
  ): Promise<Habit[]> {
    const habits = await this.habitRepo.getHabitsByUser(userId);

    let filtered = habits;

    // Filter by category if provided
    if (options?.categoryId) {
      filtered = filtered.filter((h) => h.categoryId === options.categoryId);
    }

    // Sort if requested
    if (options?.sort) {
      filtered = filtered.slice().sort((a, b) => {
        let aVal = '';
        let bVal = '';

        if (options.sort === 'createdAt') {
          aVal = a.createdAt || '';
          bVal = b.createdAt || '';
        } else if (options.sort === 'name') {
          aVal = a.name || '';
          bVal = b.name || '';
        }

        // Default order: ascending
        if (options.order === 'desc') {
          return bVal.localeCompare(aVal);
        }

        return aVal.localeCompare(bVal);
      });
    }

    return filtered;
  }

  async getHabitById(id: string, userId: string): Promise<Habit | null> {
    return this.habitRepo.getHabitById(id, userId);
  }

  async updateHabit(
    id: string,
    userId: string,
    payload: Partial<Habit>
  ): Promise<Habit | null> {
    return this.habitRepo.updateHabit(id, userId, payload);
  }

  async deleteHabit(id: string, userId: string): Promise<boolean> {
    return this.habitRepo.deleteHabit(id, userId);
  }

  // ---------- Habit streak feature ----------
  async getHabitStreak(habitId: string, userId: string): Promise<number> {
    const checkIns: CheckIn[] = await this.checkInRepo.getCheckInsForHabit(habitId, userId);

    const completedDates = new Set(
      checkIns
        .filter((c) => c.status === 'completed')
        .map((c) => c.date) // 'YYYY-MM-DD'
    );

    let streak = 0;
    let current = new Date();

    const format = (d: Date) => d.toISOString().slice(0, 10);

    while (completedDates.has(format(current))) {
      streak++;
      current.setDate(current.getDate() - 1);
    }

    return streak;
  }
}