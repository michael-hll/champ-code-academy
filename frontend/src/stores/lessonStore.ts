import { create } from 'zustand';
import type { Lesson } from '../types';
import { lessonService } from '../services/lessonService';

interface LessonState {
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;
  lastFetchParams: { startDate?: string | null; endDate?: string | null } | null;
  fetchLessons: (params?: { startDate?: string | null; endDate?: string | null }, force?: boolean) => Promise<void>;
  updateLessonStatus: (lessonId: string, status: Lesson['status']) => void;
  clearError: () => void;
  refreshLessons: () => Promise<void>;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: [],
  isLoading: false,
  error: null,
  lastFetchParams: null,

  fetchLessons: async (params, force = false) => {
    const currentStart = params?.startDate ?? null;
    const currentEnd = params?.endDate ?? null;

    // Check if we already have data for these exact params (unless force = true)
    if (!force) {
      const state = get();
      const lastStart = state.lastFetchParams?.startDate ?? null;
      const lastEnd = state.lastFetchParams?.endDate ?? null;
      
      const isSameParams = 
        state.lastFetchParams !== null &&
        currentStart === lastStart &&
        currentEnd === lastEnd;

      if (isSameParams && state.lessons.length > 0 && !state.error) {
        // Skip fetch - we already have this data
        return;
      }
    }

    try {
      set({ isLoading: true, error: null });
      const apiParams: any = {};
      if (params?.startDate) apiParams.startDate = params.startDate;
      if (params?.endDate) apiParams.endDate = params.endDate;

      const data = await lessonService.getLessons(apiParams);
      set({ 
        lessons: data, 
        isLoading: false,
        lastFetchParams: { startDate: currentStart, endDate: currentEnd }
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to load lessons',
        isLoading: false,
      });
      console.error('Error fetching lessons:', err);
    }
  },

  updateLessonStatus: (lessonId, status) => {
    // Optimistically update lesson status in the store
    set((state) => ({
      lessons: state.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, status } : lesson
      ),
    }));
  },

  refreshLessons: async () => {
    // Re-fetch with last used params, forcing a fresh fetch
    const lastParams = get().lastFetchParams;
    await get().fetchLessons(lastParams || undefined, true);
  },

  clearError: () => set({ error: null }),
}));
