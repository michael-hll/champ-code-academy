import type { Lesson } from '../types';
import { format, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday as isTodayFns } from 'date-fns';

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

// Calendar helper functions
export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
}

export function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = endOfMonth(firstDay);
  
  // Get the start and end of the calendar grid (including previous/next month days)
  const calendarStart = startOfWeek(firstDay, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(lastDay, { weekStartsOn: 0 });
  
  const days: CalendarDay[] = [];
  let currentDate = calendarStart;
  
  while (currentDate <= calendarEnd) {
    const dayOfWeek = currentDate.getDay();
    days.push({
      date: new Date(currentDate),
      dayNumber: currentDate.getDate(),
      isCurrentMonth: isSameMonth(currentDate, firstDay),
      isToday: isTodayFns(currentDate),
      isPast: currentDate < new Date() && !isTodayFns(currentDate),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    });
    currentDate = addDays(currentDate, 1);
  }
  
  return days;
}

export function getLessonsForDay(lessons: Lesson[], date: Date): Lesson[] {
  return lessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    return isSameDay(lessonDate, date);
  }).sort((a, b) => {
    // Sort by time
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function isToday(date: Date): boolean {
  return isTodayFns(date);
}
