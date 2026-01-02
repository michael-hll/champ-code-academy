import express from 'express';
import cors from 'cors';
import lessonsRouter from './routes/lessons';
import authRouter from './routes/auth';
import { lessons } from './data/lessons';

const app = express();
app.use(cors());
app.use(express.json());

// Update "Today" lessons to have today's date on startup
const updateTodayLessons = () => {
  const today = new Date();
  lessons.forEach(lesson => {
    if (lesson.type === 'Today') {
      const lessonTime = new Date(lesson.date);
      // Keep the original time, just update the date to today
      today.setHours(lessonTime.getUTCHours(), lessonTime.getUTCMinutes(), 0, 0);
      lesson.date = today.toISOString();
    }
  });
  console.log(`Updated ${lessons.filter(l => l.type === 'Today').length} "Today" lessons to current date`);
};

updateTodayLessons();

app.use('/api/auth', authRouter);
app.use('/api/lessons', lessonsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Mock API listening on http://localhost:${port}`);
});