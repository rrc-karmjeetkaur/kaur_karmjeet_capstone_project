import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import indexRouter from './routes/index';
import habitRoutes from './routes/habitRoutes';
import checkInRoutes from './routes/checkInRoutes';
import categoryRoutes from './routes/categoryRoutes';

import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api', indexRouter);
app.use('/api/habits', habitRoutes);
app.use('/api/check-ins', checkInRoutes);
app.use('/api/categories', categoryRoutes);

// Root health check
app.get('/', (_req, res) => {
  res.send('Daily Habit Tracker API is running!');
});

// Swagger docs
setupSwagger(app);

// Global error handler (MUST be last)
app.use(errorMiddleware);

export default app;