import Joi from 'joi';
import { CheckIn } from '../models/CheckIn';
import { CheckInRepository } from '../repositories/CheckInRepository';

const checkInCreateSchema = Joi.object({
  habitId: Joi.string().required(),
  date: Joi.string().required(), // could add regex for YYYY-MM-DD if you want
  status: Joi.string().valid('completed', 'missed').required(),
});

const checkInUpdateSchema = Joi.object({
  status: Joi.string().valid('completed', 'missed').optional(),
  date: Joi.string().optional(),
}).min(1);

export class CheckInService {
  private repo: CheckInRepository;

  constructor() {
    this.repo = new CheckInRepository();
  }

  async createCheckIn(userId: string, payload: any): Promise<CheckIn> {
    const { error, value } = checkInCreateSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }

    const now = new Date().toISOString();

    return this.repo.createCheckIn({
      userId,
      habitId: value.habitId,
      date: value.date,
      status: value.status,
      createdAt: now,
      updatedAt: now,
    });
  }

  async getCheckInsForHabit(habitId: string, userId: string): Promise<CheckIn[]> {
    return this.repo.getCheckInsForHabit(habitId, userId);
  }

  async getCheckInById(id: string, userId: string): Promise<CheckIn | null> {
    return this.repo.getCheckInById(id, userId);
  }

  async updateCheckIn(
    id: string,
    userId: string,
    payload: Partial<CheckIn>
  ): Promise<CheckIn | null> {
    const { error, value } = checkInUpdateSchema.validate(payload, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }

    return this.repo.updateCheckIn(id, userId, {
      ...value,
      updatedAt: new Date().toISOString(),
    });
  }

  async deleteCheckIn(id: string, userId: string): Promise<boolean> {
    return this.repo.deleteCheckIn(id, userId);
  }
}