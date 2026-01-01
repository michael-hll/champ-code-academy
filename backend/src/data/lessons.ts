import type { Lesson } from "../types/lesson";// optional type import if you want to share types via path or copy type locally

export const lessons: Lesson[] = [
  { id: 'L001', date: '2025-10-28T14:00:00Z', type: 'Historic', subject: 'Minecraft Game Design - Level 1', students: ['Ethan','Ava'], tutor: 'Sarah Tan', status: 'Completed' },
  // ... copy the mock data from frontend/mockData.ts
];