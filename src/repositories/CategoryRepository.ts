import admin from '../config/firebase';
import { Category } from '../models/Category';

const db = admin.firestore();
const categoriesCol = db.collection('categories');

export class CategoryRepository {
  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const docRef = await categoriesCol.add(category);
    return { id: docRef.id, ...category };
  }

  async getCategoriesByUser(userId: string): Promise<Category[]> {
    const snapshot = await categoriesCol.where('userId', '==', userId).get();

    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Category, 'id'>;
      return { id: doc.id, ...data };
    });
  }

  async getCategoryById(id: string, userId: string): Promise<Category | null> {
    const doc = await categoriesCol.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as Omit<Category, 'id'>;

    if (data.userId !== userId) return null;

    return { id: doc.id, ...data };
  }

  async updateCategory(
    id: string,
    userId: string,
    partial: Partial<Category>
  ): Promise<Category | null> {
    const existing = await this.getCategoryById(id, userId);
    if (!existing) return null;

    await categoriesCol.doc(id).update(partial);

    const updated = await this.getCategoryById(id, userId);
    return updated;
  }

  async deleteCategory(id: string, userId: string): Promise<boolean> {
    const existing = await this.getCategoryById(id, userId);
    if (!existing) return false;

    await categoriesCol.doc(id).delete();
    return true;
  }
}