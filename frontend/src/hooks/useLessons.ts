import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonService } from '../services/lessonService';
import type { Lesson } from '../types';

interface LessonQueryParams {
  startDate?: string | null;
  endDate?: string | null;
}

/**
 * Hook to fetch lessons with optional date range filtering
 * Each page (Dashboard/Calendar) can use different params without conflicts
 */
export function useLessons(params?: LessonQueryParams) {
  const queryKey = ['lessons', params?.startDate || null, params?.endDate || null];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      const apiParams: any = {};
      if (params?.startDate) apiParams.startDate = params.startDate;
      if (params?.endDate) apiParams.endDate = params.endDate;
      
      return await lessonService.getLessons(apiParams);
    },
    // If we want to use the all options, then we can't use the enabled flag like this
    // in the future we need pagination so the all option can be handled correctly
    // enabled: Boolean(params?.startDate || params?.endDate)
  });
}

/**
 * Hook to take a lesson (mutation)
 * Optimistically updates cache and refetches on success
 */
export function useTakeLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => lessonService.takeClass(lessonId),
    
    // Optimistic update
    onMutate: async (lessonId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['lessons'] });
      
      // Snapshot previous values
      const previousQueries = queryClient.getQueriesData({ queryKey: ['lessons'] });
      
      // Optimistically update all lesson queries
      queryClient.setQueriesData<Lesson[]>(
        { queryKey: ['lessons'] },
        (old) => old?.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, status: 'Confirmed' as const, type: 'Upcoming' as const }
            : lesson
        )
      );
      
      return { previousQueries };
    },
    
    // Rollback on error
    onError: (err, _lessonId, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      console.error('Failed to take lesson:', err);
    },
    
    // Refetch to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}
