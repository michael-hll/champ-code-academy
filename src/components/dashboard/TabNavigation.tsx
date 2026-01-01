import type { TabType } from '../../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    today: number;
    upcoming: number;
    available: number;
    historic: number;
  };
}

export default function TabNavigation({ activeTab, onTabChange, counts }: TabNavigationProps) {
  const tabs = [
    { id: 'today' as TabType, label: "Today's Lessons", icon: '🔴', count: counts.today },
    { id: 'upcoming' as TabType, label: 'Upcoming', icon: '📅', count: counts.upcoming },
    { id: 'available' as TabType, label: 'Available', icon: '🟣', count: counts.available },
    { id: 'historic' as TabType, label: 'Historic', icon: '📚', count: counts.historic },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max sm:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 min-w-[140px] sm:min-w-0 px-6 py-4 font-semibold text-center transition-all duration-200 border-b-4 whitespace-nowrap ${activeTab === tab.id
              ? 'border-sky-500 text-sky-600 bg-sky-50'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
          >
            <span className="text-xl mr-2">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
