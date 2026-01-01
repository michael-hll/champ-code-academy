import type { Lesson } from '../types';
import { format } from 'date-fns';

export interface GroupedLessons {
  month: string; // "January 2026"
  monthKey: string; // "2026-01" for sorting
  lessons: Lesson[];
}

export function groupLessonsByMonth(lessons: Lesson[]): GroupedLessons[] {
  // Group lessons by month
  const grouped = lessons.reduce((acc, lesson) => {
    const date = new Date(lesson.date);
    const monthKey = format(date, 'yyyy-MM'); // "2026-01"
    const monthLabel = format(date, 'MMMM yyyy'); // "January 2026"

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthLabel,
        monthKey: monthKey,
        lessons: [],
      };
    }

    acc[monthKey].lessons.push(lesson);
    return acc;
  }, {} as Record<string, GroupedLessons>);

  // Convert to array and sort by month (newest first for upcoming, oldest first for historic)
  return Object.values(grouped).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
}
