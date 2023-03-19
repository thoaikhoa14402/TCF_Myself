// listening for request
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // 0 is success; 1 is uncaught exception
});

// config environment variables
dotenv.config({ path: './config.env' });
import app from './app.js';

// connecting to mongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB successfully!'));

// init server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// handle unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection. Shutting down...');
  console.log(err.name, err.message);
  Server.close(() => {
    process.exit(1); // 0 is success, 1 is uncaught exception
  });
});
