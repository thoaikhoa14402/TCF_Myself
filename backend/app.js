import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import AppError from './utilities/appError.js';
import globalErrorHandler from './controllers/errorController.js';

import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10mb' }));

// middleware for cookies
app.use(cookieParser());

// Mounting routers
app.use('/tcf/v1/users', userRouter);
app.use('/tcf/v1/products', productRouter);
// app.use('/tcf/v1/cart');
// app.use('/tcf/v1/order');
// app.use('/tcf/v1/admin');

// handle iff url is not existent
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

// export for server using
export default app;
