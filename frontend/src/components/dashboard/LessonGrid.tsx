import type { Lesson } from '../../types';
import LessonCard from './LessonCard';
import { groupLessonsByMonth } from '../../utils/dateHelpers';

interface LessonGridProps {
  lessons: Lesson[];
  onLessonUpdate?: () => void;
  groupByMonth?: boolean;
}

export default function LessonGrid({ lessons, onLessonUpdate, groupByMonth = true }: LessonGridProps) {
  if (lessons.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No lessons found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or check back later for new lessons!
        </p>
      </div>
    );
  }

  // If groupByMonth is false, render simple grid without month grouping
  if (!groupByMonth) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onLessonUpdate={onLessonUpdate} />
        ))}
      </div>
    );
  }

  // Group lessons by month
  const groupedLessons = groupLessonsByMonth(lessons);

  return (
    <div className="space-y-8">
      {groupedLessons.map((group) => (
        <div key={group.monthKey}>
          {/* Month Divider */}
          <div className="flex items-center mb-6">
            <div className="grow border-t-2 border-gray-300"></div>
            <div className="px-4 py-2 bg-linear-to-r from-sky-500 to-purple-500 rounded-full shadow-md">
              <h2 className="text-lg font-bold text-white">
                📅 {group.month.toUpperCase()} ({group.lessons.length} {group.lessons.length === 1 ? 'lesson' : 'lessons'})
              </h2>
            </div>
            <div className="grow border-t-2 border-gray-300"></div>
          </div>

          {/* Lessons Grid for this month */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onLessonUpdate={onLessonUpdate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
