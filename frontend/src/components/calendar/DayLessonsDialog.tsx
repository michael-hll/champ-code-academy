import { useEffect } from 'react';
import { format } from 'date-fns';
import type { Lesson } from '../../types';
import LessonCard from '../dashboard/LessonCard';

interface DayLessonsDialogProps {
  isOpen: boolean;
  date: Date | null;
  lessons: Lesson[];
  onClose: () => void;
  onLessonUpdate?: (lessonId: string) => void;
}

export default function DayLessonsDialog({
  isOpen,
  date,
  lessons,
  onClose,
  onLessonUpdate,
}: DayLessonsDialogProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !date) return null;

  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border max-w-4xl w-full max-h-[80vh] overflow-hidden animate-scaleIn pointer-events-auto">
          {/* Header */}
          <div className="bg-linear-to-r from-sky-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {formattedDate}
              </h2>
              <p className="text-sky-100 text-sm mt-1">
                {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'} scheduled
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              aria-label="Close dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {lessons.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-500 dark:text-dark-muted text-lg">
                  No lessons scheduled for this day
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onLessonUpdate={onLessonUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
