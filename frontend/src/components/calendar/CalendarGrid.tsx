import type { Lesson } from '../../types';
import type { CalendarDay } from '../../utils/dateHelpers';
import { getLessonsForDay } from '../../utils/dateHelpers';
import DayCell from './DayCell';

interface CalendarGridProps {
  days: CalendarDay[];
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
  onDayClick: (date: Date, lessons: Lesson[]) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ days, lessons, onLessonClick, onDayClick }: CalendarGridProps) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-100 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-bold text-gray-700 dark:text-dark-text uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayLessons = getLessonsForDay(lessons, day.date);
          return (
            <DayCell
              key={index}
              day={day}
              lessons={dayLessons}
              onLessonClick={onLessonClick}
              onMoreClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
}
