import { api } from './api';
import type { Lesson } from '../types';
import { mockLessons, filterLessonsByDate, takeLessonMock } from '../mocks/lessons';

// Check if we should use backend API or mock data
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

export const lessonService = {
  // Get all lessons with optional filters
  getLessons: async (params?: { 
    type?: string; 
    month?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Lesson[]> => {
    if (!USE_BACKEND) {
      // Mock mode: return filtered mock data
      await new Promise(resolve => setTimeout(resolve, 10)); // Simulate network delay
      return filterLessonsByDate(mockLessons, params?.startDate, params?.endDate);
    }
    
    // Backend mode: call real API
    const { data } = await api.get('/api/lessons', { params });
    return data;
  },

  // Get a single lesson by ID
  getLessonById: async (id: string): Promise<Lesson> => {
    if (!USE_BACKEND) {
      // Mock mode: find lesson in mock data
      await new Promise(resolve => setTimeout(resolve, 10));
      const lesson = mockLessons.find(l => l.id === id);
      if (!lesson) throw new Error('Lesson not found');
      return lesson;
    }
    
    // Backend mode: call real API
    const { data } = await api.get(`/api/lessons/${id}`);
    return data;
  },

  // Take an available class
  takeClass: async (id: string): Promise<Lesson> => {
    if (!USE_BACKEND) {
      // Mock mode: simulate mutation
      await new Promise(resolve => setTimeout(resolve, 10));
      const lesson = takeLessonMock(id);
      if (!lesson) throw new Error('Lesson not found or not available');
      return lesson;
    }
    
    // Backend mode: call real API
    const { data } = await api.post(`/api/lessons/${id}/take`);
    return data;
  },
};
