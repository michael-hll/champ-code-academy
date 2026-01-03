import type { Lesson } from '../types';

// Mock lesson data for static deployment (when VITE_USE_BACKEND=false)
// This mirrors the backend data structure
export const mockLessons: Lesson[] = [
  {
    id: "L001",
    date: "2025-10-28T14:00:00Z",
    type: "Historic",
    subject: "Minecraft Game Design - Level 1",
    students: ["Ethan", "Ava"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L002",
    date: "2025-11-02T09:00:00Z",
    type: "Historic",
    subject: "Roblox Coding Basics",
    students: ["Lucas"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L003",
    date: "2025-11-05T16:00:00Z",
    type: "Historic",
    subject: "Python for Kids - Introduction",
    students: ["Chloe", "Aaron"],
    tutor: "Sarah Tan",
    status: "Completed"
  },
  {
    id: "L004",
    date: "2025-12-31T10:00:00Z",
    type: "Today",
    subject: "Minecraft Redstone Logic",
    students: ["Emma", "Noah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L005",
    date: "2025-12-31T15:00:00Z",
    type: "Today",
    subject: "Roblox Game Design - Level 2",
    students: ["Ryan", "Mia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L006",
    date: "2026-01-10T12:00:00Z",
    type: "Upcoming",
    subject: "Website Design for Beginners",
    students: ["Olivia"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  },
  {
    id: "L007",
    date: "2026-01-12T11:00:00Z",
    type: "Available",
    subject: "Python for Kids - Game Projects",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L008",
    date: "2026-01-13T17:00:00Z",
    type: "Available",
    subject: "Roblox Game Design - Level 1",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L009",
    date: "2026-01-14T10:00:00Z",
    type: "Available",
    subject: "Minecraft AI Coding Adventure",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L010",
    date: "2026-01-15T09:00:00Z",
    type: "Upcoming",
    subject: "Python Automation for Kids",
    students: ["Elijah"],
    tutor: "Sarah Tan",
    status: "Confirmed"
  }
];

// Helper to filter lessons by date range
export function filterLessonsByDate(
  lessons: Lesson[],
  startDate?: string | null,
  endDate?: string | null
): Lesson[] {
  if (!startDate && !endDate) {
    return lessons;
  }

  return lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    if (start && end) {
      return lessonDate >= start && lessonDate <= end;
    } else if (start) {
      return lessonDate >= start;
    } else if (end) {
      return lessonDate <= end;
    }
    return true;
  });
}

// Simulate taking a lesson (mutation in mock mode)
export function takeLessonMock(lessonId: string): Lesson | null {
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson || lesson.status !== 'Available') {
    return lesson || null;
  }

  // Update lesson in place (simulates backend mutation)
  lesson.status = 'Confirmed';
  lesson.tutor = 'Sarah Tan';

  // Update type based on date
  const lessonDate = new Date(lesson.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lessonDate.setHours(0, 0, 0, 0);

  if (lessonDate.getTime() === today.getTime()) {
    lesson.type = 'Today';
  } else if (lessonDate > today) {
    lesson.type = 'Upcoming';
  } else {
    lesson.type = 'Historic';
  }

  return lesson;
}
