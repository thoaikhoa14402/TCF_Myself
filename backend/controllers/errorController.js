import AppError from '../utilities/appError.js';

// handle specific error (pre-processing) (from mongoose, library,...)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400); // Bad request (400)
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another value!`;
  return new AppError(message, 400); // Bad request (400)
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400); // Bad request(400)
};

const handleJWTError = () => new AppError('Invalid token. Please try again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Try to refresh a new one!', 401);

// send error as development environment (for debugging purpose)
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// send error as production environment
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming error or other unknown error: don't leak error details
  } else {
    // 1) Log error
    // console.error('ERROR  💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong! 💥',
    });
  }
};

// error handler
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    // send error as development environment
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // send error as production environment (meaning response for client)
    //let error = { ...err, name: err.name, errmsg: err.errmsg };
    let error = Object.defineProperties(err, {
      [Object.keys(err)]: {
        writable: true,
      },
    }); // Property of default error object in mongoose is read only, so it can not be copied, assigned, edited,... We need to turn writeable to true (default it's false)
    // Ex:  Error.prototype.name, Error.prototype.errmsg is not enumerable therefore it will not be copied into the new object.
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    sendErrorProd(error, res);
  }
};
