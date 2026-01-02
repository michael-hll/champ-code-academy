import { api } from './api';
import type { Lesson } from '../types';

export const lessonService = {
  // Get all lessons with optional filters
  getLessons: async (params?: { 
    type?: string; 
    month?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Lesson[]> => {
    const { data } = await api.get('/api/lessons', { params });
    return data;
  },

  // Get a single lesson by ID
  getLessonById: async (id: string): Promise<Lesson> => {
    const { data } = await api.get(`/api/lessons/${id}`);
    return data;
  },

  // Take an available class
  takeClass: async (id: string): Promise<Lesson> => {
    const { data } = await api.post(`/api/lessons/${id}/take`);
    return data;
  },
};
