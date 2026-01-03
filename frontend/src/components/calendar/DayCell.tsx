import type { Lesson } from '../../types';
import type { CalendarDay } from '../../utils/dateHelpers';
import LessonItem from './LessonItem';

interface DayCellProps {
  day: CalendarDay;
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
  onMoreClick: (date: Date, lessons: Lesson[]) => void;
}

export default function DayCell({ day, lessons, onLessonClick, onMoreClick }: DayCellProps) {
  const maxVisibleLessons = 3;
  const visibleLessons = lessons.slice(0, maxVisibleLessons);
  const hiddenCount = lessons.length - maxVisibleLessons;

  // Determine cell styling based on day properties
  const getCellClasses = () => {
    const baseClasses = 'min-h-[120px] p-2 border transition-all duration-200';

    let classes = baseClasses;

    // Current day styling
    if (day.isToday) {
      classes += ' border-2 border-sky-500 bg-sky-50 dark:bg-sky-900/20';
    } else {
      classes += ' border-gray-200 dark:border-dark-border';
    }

    // Weekend styling
    if (day.isWeekend && !day.isToday) {
      classes += ' bg-gray-50 dark:bg-dark-surface/50';
    } else if (!day.isToday) {
      classes += ' bg-white dark:bg-dark-surface';
    }

    // Other month days - dimmed
    if (!day.isCurrentMonth) {
      classes += ' opacity-40';
    }

    // Past days
    if (day.isPast && !day.isToday) {
      classes += ' opacity-60';
    }

    // Hover effect if has lessons
    if (lessons.length > 0 && day.isCurrentMonth) {
      classes += ' hover:shadow-lg hover:scale-[1.02] cursor-pointer';
    }

    return classes;
  };

  const getDayNumberClasses = () => {
    const baseClasses = 'text-sm font-semibold mb-1';

    if (day.isToday) {
      return `${baseClasses} text-sky-600 dark:text-sky-400`;
    }
    if (!day.isCurrentMonth) {
      return `${baseClasses} text-gray-400 dark:text-dark-muted`;
    }
    return `${baseClasses} text-gray-700 dark:text-dark-text`;
  };

  return (
    <div className={getCellClasses()}>
      {/* Day number */}
      <div className="flex justify-between items-start mb-1">
        <span className={getDayNumberClasses()}>
          {day.dayNumber}
        </span>
        {day.isToday && (
          <span className="text-xs bg-sky-500 text-white px-1.5 py-0.5 rounded-full font-bold">
            Today
          </span>
        )}
      </div>

      {/* Lesson items */}
      <div className="space-y-1">
        {visibleLessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            onClick={() => onLessonClick(lesson)}
          />
        ))}

        {/* Show "+X more" if there are hidden lessons */}
        {hiddenCount > 0 && (
          <button
            onClick={() => onMoreClick(day.date, lessons)}
            className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold hover:underline w-full text-left px-2 py-1"
          >
            +{hiddenCount} more
          </button>
        )}
      </div>
    </div>
  );
}
