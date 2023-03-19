import jwt from 'jsonwebtoken';
import AppError from '../utilities/appError.js';

// verify access token
export const verifyJWT = async (req, res, next) => {
  // 1) Getting token check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('Your are not logged in! Please log in to get access!', 401));
  // 2) Check if it's valid token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // return res.sendStatus(403); // invalid token
      return next(err);
    }
    req.userRole = decoded.role;
    req.userId = decoded.id;
    req.jwtIssuedAt = decoded.iat;
    next();
  });
};
