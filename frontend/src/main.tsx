import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import { mockLessons } from './mocks/lessons.ts';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes - when data becomes stale
      gcTime: 1000 * 60 * 5,   // 5 minutes - when to garbage collect inactive queries
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

// In order to demo: make sure the "Today" lessons in mock data are always set to the current date
const updateTodayLessons = () => {
  const today = new Date();
  mockLessons.forEach(lesson => {
    if (lesson.type === 'Today') {
      const lessonTime = new Date(lesson.date);
      // Keep the original time, just update the date to today
      today.setHours(lessonTime.getUTCHours(), lessonTime.getUTCMinutes(), 0, 0);
      lesson.date = today.toISOString();
    }
  });
};
updateTodayLessons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.VITE_ENABLE_RQ_DEVTOOLS === 'true' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>,
)
