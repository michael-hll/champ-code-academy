import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, addMonths, subMonths, format } from 'date-fns';
import DashboardLayout from '../components/layout/DashboardLayout';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import DayLessonsDialog from '../components/calendar/DayLessonsDialog';
import { useLessonStore } from '../stores/lessonStore';
import { generateCalendarDays, getLessonsForDay } from '../utils/dateHelpers';
import type { Lesson } from '../types';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayLessons, setSelectedDayLessons] = useState<Lesson[]>([]);

  // Get lessons from store
  const lessons = useLessonStore((state) => state.lessons);
  const isLoading = useLessonStore((state) => state.isLoading);
  const error = useLessonStore((state) => state.error);
  const fetchLessons = useLessonStore((state) => state.fetchLessons);
  const refreshLessons = useLessonStore((state) => state.refreshLessons);

  // Fetch lessons for the current month when month changes
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = format(monthStart, 'yyyy-MM-dd');
    const endDate = format(monthEnd, 'yyyy-MM-dd');

    fetchLessons({ startDate, endDate });
  }, [currentDate, fetchLessons]);

  // Generate calendar days for the current month
  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Navigation handlers
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Dialog handlers
  const handleLessonClick = (lesson: Lesson) => {
    const lessonDate = new Date(lesson.date);
    const dayLessons = getLessonsForDay(lessons, lessonDate);
    setSelectedDate(lessonDate);
    setSelectedDayLessons(dayLessons);
    setIsDialogOpen(true);
  };

  const handleDayClick = (date: Date, dayLessons: Lesson[]) => {
    setSelectedDate(date);
    setSelectedDayLessons(dayLessons);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
    setSelectedDayLessons([]);
  };

  const handleLessonUpdate = async () => {
    // Refresh lessons after update
    await refreshLessons();

    // Update the dialog with refreshed lessons for the selected day
    if (selectedDate) {
      const updatedLessons = useLessonStore.getState().lessons;
      const updatedDayLessons = getLessonsForDay(updatedLessons, selectedDate);
      setSelectedDayLessons(updatedDayLessons);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-dark-text mb-2">
          📅 Calendar View
        </h1>
        <p className="text-gray-600 dark:text-dark-text text-lg">
          Monthly overview of your teaching schedule
        </p>
      </div>

      {/* Calendar Header (Month navigation) */}
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-dark-muted">Loading calendar...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 font-semibold mb-2">❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Calendar Grid */}
      {!isLoading && !error && (
        <CalendarGrid
          days={calendarDays}
          lessons={lessons}
          onLessonClick={handleLessonClick}
          onDayClick={handleDayClick}
        />
      )}

      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-dark-surface rounded-lg shadow-md border border-gray-200 dark:border-dark-border p-4">
        <h3 className="text-sm font-bold text-gray-700 dark:text-dark-text mb-3">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔴</span>
            <span className="text-sm text-gray-600 dark:text-dark-muted">Today's Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <span className="text-sm text-gray-600 dark:text-dark-muted">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🟣</span>
            <span className="text-sm text-gray-600 dark:text-dark-muted">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📚</span>
            <span className="text-sm text-gray-600 dark:text-dark-muted">Historic</span>
          </div>
        </div>
      </div>

      {/* Day Lessons Dialog */}
      <DayLessonsDialog
        isOpen={isDialogOpen}
        date={selectedDate}
        lessons={selectedDayLessons}
        onClose={handleCloseDialog}
        onLessonUpdate={handleLessonUpdate}
      />
    </DashboardLayout>
  );
}
