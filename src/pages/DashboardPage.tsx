import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import FilterControls from '../components/dashboard/FilterControls';
import TabNavigation from '../components/dashboard/TabNavigation';
import LessonGrid from '../components/dashboard/LessonGrid';
import type { TabType } from '../types';
import { mockLessons } from '../data/mockData';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('today');

  // Filter lessons based on active tab
  const filteredLessons = mockLessons.filter((lesson) => {
    if (activeTab === 'today') return lesson.type === 'Today';
    if (activeTab === 'upcoming') return lesson.type === 'Upcoming';
    if (activeTab === 'available') return lesson.type === 'Available';
    if (activeTab === 'historic') return lesson.type === 'Historic';
    return false;
  });

  // Count lessons by type
  const counts = {
    today: mockLessons.filter((l) => l.type === 'Today').length,
    upcoming: mockLessons.filter((l) => l.type === 'Upcoming').length,
    available: mockLessons.filter((l) => l.type === 'Available').length,
    historic: mockLessons.filter((l) => l.type === 'Historic').length,
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          My Dashboard 📊
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Here's your teaching schedule
        </p>
      </div>

      {/* Filter Controls */}
      <FilterControls />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Lesson Grid */}
      <LessonGrid lessons={filteredLessons} />
    </DashboardLayout>
  );
}
