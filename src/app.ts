/*
 * Title: Meeting Room
 * Description: A meeting room booking system application.
 * Author: Md Naim Uddin
 * Date: 12/06/2024
 *
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/utils';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://keeb-keyboard.vercel.app',
    ],
    credentials: true,
  }),
);

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

// Application routes
app.use('/api/v1', router);

// Not-Found routes error handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
