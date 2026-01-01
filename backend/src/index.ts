import express from 'express';
import cors from 'cors';
import lessonsRouter from './routes/lessons';
import authRouter from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/lessons', lessonsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Mock API listening on http://localhost:${port}`);
});