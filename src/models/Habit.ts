export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
}
