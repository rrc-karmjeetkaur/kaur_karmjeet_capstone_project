import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', indexRouter);
app.get('/', (_req, res) => {
  res.send('Daily Habit Tracker API is running!');
});

export default app;
