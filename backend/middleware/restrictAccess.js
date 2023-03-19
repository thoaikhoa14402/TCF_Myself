import catchAsync from '../utilities/catchAsync.js';
import AppError from '../utilities/appError.js';

const restrictList = {
  'http://localhost:3000/': 'customer',
  'http://localhost:3001/': 'admin',
};

export const restrictAccessForCustomer = catchAsync(async (req, res, next) => {
  //console.log(req.socket.remoteAddress); // guest's ip
  req.restrictTo = restrictList[req.headers.referer] || null;
  console.log('This is used for customer');
  console.log('restrict to: ', req.restrictTo);
  console.log(req.userRole === req.restrictTo);
  if (!req.restrictTo || (req.restrictTo !== req.userRole && req.userRole !== 'customer'))
    return next(new AppError('You do not have permission to perform this action.', 403));
  next();
});

export const restrictAccessForAdmin = catchAsync(async (req, res, next) => {
  //console.log(req.socket.remoteAddress); // guest's ip
  req.restrictTo = restrictList[req.headers.referer] || null;

  if (!req.restrictTo || (req.restrictTo !== req.userRole && req.userRole !== 'admin'))
    return next(new AppError('You do not have permission to perform this action.', 403));
  next();
});

// headers.referer like domain.
