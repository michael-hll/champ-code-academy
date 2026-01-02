import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import FilterControls from '../components/dashboard/FilterControls';
import TabNavigation from '../components/dashboard/TabNavigation';
import LessonGrid from '../components/dashboard/LessonGrid';
import type { TabType, Lesson } from '../types';
import { lessonService } from '../services/lessonService';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null,
  });

  // Fetch lessons from API with date filters
  const fetchLessons = async (startDate?: string | null, endDate?: string | null) => {
    try {
      setIsLoading(true);
      setError(null);
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const data = await lessonService.getLessons(params);
      setLessons(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load lessons');
      console.error('Error fetching lessons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (startDate: string | null, endDate: string | null) => {
    setDateFilter({ startDate, endDate });
    fetchLessons(startDate, endDate);
  };

  useEffect(() => {
    // Initial fetch will be triggered by FilterControls on mount
  }, []);

  // Filter lessons based on active tab
  const filteredLessons = lessons.filter((lesson) => {
    if (activeTab === 'today') return lesson.type === 'Today';
    if (activeTab === 'upcoming') return lesson.type === 'Upcoming';
    if (activeTab === 'available') return lesson.type === 'Available';
    if (activeTab === 'historic') return lesson.type === 'Historic';
    return false;
  });

  // Count lessons by type
  const counts = {
    today: lessons.filter((l) => l.type === 'Today').length,
    upcoming: lessons.filter((l) => l.type === 'Upcoming').length,
    available: lessons.filter((l) => l.type === 'Available').length,
    historic: lessons.filter((l) => l.type === 'Historic').length,
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
      <FilterControls onFilterChange={handleFilterChange} />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lessons...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold mb-2">❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-red-700 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Lesson Grid */}
      {!isLoading && !error && (
        <LessonGrid
          lessons={filteredLessons}
          onLessonUpdate={() => fetchLessons(dateFilter.startDate, dateFilter.endDate)}
          groupByMonth={activeTab !== 'today'}
        />
      )}
    </DashboardLayout>
  );
}
