import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Month and Year Display */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        {format(currentDate, 'MMMM yyyy')}
      </h2>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Today Button */}
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-semibold text-sky-600 dark:text-sky-400 
                   hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
        >
          Today
        </button>

        {/* Month Navigation */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-dark-bg rounded-lg p-1">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-white dark:hover:bg-dark-surface rounded-md transition-colors group"
            aria-label="Previous month"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-dark-text group-hover:text-gray-900 dark:group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-white dark:hover:bg-dark-surface rounded-md transition-colors group"
            aria-label="Next month"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-dark-text group-hover:text-gray-900 dark:group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
