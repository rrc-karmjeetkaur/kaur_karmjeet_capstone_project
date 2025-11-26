import admin from '../config/firebase';
import { CheckIn } from '../models/CheckIn';

const db = admin.firestore();
const checkInsCol = db.collection('checkIns');

export class CheckInRepository {
  async createCheckIn(checkIn: Omit<CheckIn, 'id'>): Promise<CheckIn> {
    const docRef = await checkInsCol.add(checkIn);
    return { id: docRef.id, ...checkIn };
  }

  async getCheckInsForHabit(habitId: string, userId: string): Promise<CheckIn[]> {
    const snapshot = await checkInsCol
      .where('habitId', '==', habitId)
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<CheckIn, 'id'>;
      return { id: doc.id, ...data };
    });
  }

  async getCheckInById(id: string, userId: string): Promise<CheckIn | null> {
    const doc = await checkInsCol.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as Omit<CheckIn, 'id'>;

    if (data.userId !== userId) return null;

    return { id: doc.id, ...data };
  }

  async updateCheckIn(
    id: string,
    userId: string,
    partial: Partial<CheckIn>
  ): Promise<CheckIn | null> {
    const existing = await this.getCheckInById(id, userId);
    if (!existing) return null;

    await checkInsCol.doc(id).update({
      ...partial,
      updatedAt: new Date().toISOString(),
    });

    const updated = await this.getCheckInById(id, userId);
    return updated;
  }

  async deleteCheckIn(id: string, userId: string): Promise<boolean> {
    const existing = await this.getCheckInById(id, userId);
    if (!existing) return false;

    await checkInsCol.doc(id).delete();
    return true;
  }
}