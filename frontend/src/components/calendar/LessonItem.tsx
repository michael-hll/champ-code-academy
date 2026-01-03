import type { Lesson } from '../../types';

interface LessonItemProps {
  lesson: Lesson;
  onClick: () => void;
}

export default function LessonItem({ lesson, onClick }: LessonItemProps) {
  const getIcon = (type: Lesson['type']) => {
    const icons = {
      'Today': '🔴',
      'Upcoming': '📅',
      'Available': '🟣',
      'Historic': '📚',
    };
    return icons[type] || '📌';
  };

  const getBorderColor = (type: Lesson['type']) => {
    const colors = {
      'Today': 'border-red-500',
      'Upcoming': 'border-amber-500',
      'Available': 'border-purple-500',
      'Historic': 'border-gray-400',
    };
    return colors[type] || 'border-gray-400';
  };

  const getHoverBg = (type: Lesson['type']) => {
    const colors = {
      'Today': 'hover:bg-red-50 dark:hover:bg-red-900/10',
      'Upcoming': 'hover:bg-amber-50 dark:hover:bg-amber-900/10',
      'Available': 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
      'Historic': 'hover:bg-gray-50 dark:hover:bg-gray-800/10',
    };
    return colors[type] || 'hover:bg-gray-50';
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-2 py-1 rounded-md text-xs
        border-l-4 ${getBorderColor(lesson.type)}
        ${getHoverBg(lesson.type)}
        bg-white/50 dark:bg-dark-bg/30
        transition-all duration-150
        truncate
        group
      `}
      title={lesson.subject}
    >
      <span className="flex items-center gap-1">
        <span className="shrink-0">{getIcon(lesson.type)}</span>
        <span className="truncate font-medium text-gray-700 dark:text-dark-text group-hover:text-gray-900 dark:group-hover:text-white">
          {lesson.subject}
        </span>
      </span>
    </button>
  );
}
