import admin from '../config/firebase';
import { Habit } from '../models/Habit';

const db = admin.firestore();
const habitsCol = db.collection('habits');

export class HabitRepository {
  async createHabit(habit: Omit<Habit, 'id'>): Promise<Habit> {
    const docRef = await habitsCol.add(habit);
    return { id: docRef.id, ...habit };
  }

  async getHabitsByUser(userId: string): Promise<Habit[]> {
    const snapshot = await habitsCol.where('userId', '==', userId).get();

    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Habit, 'id'>;
      return { id: doc.id, ...data };
    });
  }

  async getHabitById(id: string, userId: string): Promise<Habit | null> {
    const doc = await habitsCol.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as Omit<Habit, 'id'>;

    // prevent access to other users' habits
    if (data.userId !== userId) return null;

    return { id: doc.id, ...data };
  }

  async updateHabit(
    id: string,
    userId: string,
    partial: Partial<Habit>
  ): Promise<Habit | null> {
    const existing = await this.getHabitById(id, userId);
    if (!existing) return null;

    await habitsCol.doc(id).update({
      ...partial,
      updatedAt: new Date().toISOString(),
    });

    const updated = await this.getHabitById(id, userId);
    return updated;
  }

  async deleteHabit(id: string, userId: string): Promise<boolean> {
    const existing = await this.getHabitById(id, userId);
    if (!existing) return false;

    await habitsCol.doc(id).delete();
    return true;
  }
}