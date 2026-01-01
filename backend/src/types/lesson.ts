export interface Lesson {
  id: string;
  date: string; // ISO 8601
  type: 'Historic' | 'Upcoming' | 'Available' | 'Today';
  subject: string;
  students: string[];
  tutor: string | null;
  status: 'Completed' | 'Confirmed' | 'Available';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
