import type { Lesson } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { format } from 'date-fns';

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const lessonDate = new Date(lesson.date);
  const formattedDate = format(lessonDate, 'MMM dd, yyyy');
  const formattedTime = format(lessonDate, 'hh:mm a');

  const getBadgeVariant = (type: string) => {
    const variants: Record<string, 'today' | 'upcoming' | 'available' | 'historic'> = {
      'Today': 'today',
      'Upcoming': 'upcoming',
      'Available': 'available',
      'Historic': 'historic',
    };
    return variants[type] || 'historic';
  };

  return (
    <Card hover className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <Badge variant={getBadgeVariant(lesson.type)}>
          {lesson.type === 'Today' && '🔴 '}
          {lesson.type === 'Upcoming' && '📅 '}
          {lesson.type === 'Available' && '🟣 '}
          {lesson.type === 'Historic' && '📚 '}
          {lesson.type.toUpperCase()}
        </Badge>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">{formattedDate}</p>
          <p className="text-xs text-gray-500">{formattedTime}</p>
        </div>
      </div>

      {/* Subject */}
      <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2">
        📚 {lesson.subject}
      </h3>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="text-lg mr-2">👥</span>
          <span className="text-gray-700 font-medium">
            {lesson.students.length > 0
              ? lesson.students.join(', ')
              : 'No students yet'}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-lg mr-2">🎯</span>
          <span className="text-gray-700 font-medium">
            {lesson.students.length > 1 ? 'Group Lesson' :
              lesson.students.length === 1 ? '1-on-1 Lesson' :
                'Open Slot'}
          </span>
        </div>
        {lesson.tutor && (
          <div className="flex items-center text-sm">
            <span className="text-lg mr-2">👨‍🏫</span>
            <span className="text-gray-700 font-medium">{lesson.tutor}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-gray-200">
        {lesson.status === 'Available' ? (
          <Button variant="success" fullWidth>
            ✅ Take This Class
          </Button>
        ) : lesson.status === 'Confirmed' && lesson.type === 'Today' ? (
          <Button variant="primary" fullWidth>
            🚀 Start Class
          </Button>
        ) : lesson.status === 'Confirmed' ? (
          <Button variant="outline" fullWidth>
            👁️ View Details
          </Button>
        ) : (
          <Button variant="secondary" fullWidth disabled>
            ✓ Completed
          </Button>
        )}
      </div>
    </Card>
  );
}
