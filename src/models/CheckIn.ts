export interface CheckIn {
  id: string;
  habitId: string;
  userId: string;
  date: string; // 'YYYY-MM-DD'
  status: 'completed' | 'missed';
  createdAt: string;
  updatedAt: string;
}
