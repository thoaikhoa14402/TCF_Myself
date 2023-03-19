import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import catchAsync from '../utilities/catchAsync.js';
import User from '../models/userModel.js';
import AppError from '../utilities/appError.js';
import { signAccessToken, signRefreshToken, signPasswordResetToken } from '../utilities/signJWT.js';
import sendEmail from '../utilities/sendEmail.js';

// sign up handle
export const signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email and password are required.', 400)); // 400 bad request
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  // 201 code: request has succeeded and has led to the creation of resource
  return res.status(201).json({
    status: 'success',
    data: {
      id: newUser.id,
      email: newUser.email,
      active: newUser.status,
      userRole: newUser.role,
    },
  });
});

// login handle
export const login = catchAsync(async (req, res, next) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) return next(new AppError('Please provide email and password', 400)); // 400 Bad request
  // 2) Check if user exists && password is correct
  const foundUser = await User.findOne({ email: email }).select('+password');
  if (!foundUser || !(await foundUser.correctPassword(password, foundUser.password))) {
    return next(new AppError('Incorrect email or password', 401)); // 401 Unauthorized
  }

  // if user exists, create new access token and refresh token
  const accessToken = signAccessToken({ id: foundUser._id, role: foundUser.role });
  const newRefreshToken = signRefreshToken({ id: foundUser._id, role: foundUser.role });

  let newRefreshTokenArray = !cookies?.jwt
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt != cookies.jwt);

  if (cookies?.jwt) {
    /* 
    Scenario added here: 
      1) User logs in but never uses RT and does not logout 
      2) RT is stolen
      3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      console.log('Attempted refresh token reuse at login');
      // clear out ALL previous refresh tokensS
      newRefreshTokenArray = [];
    }

    // clear old cookies
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      //secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  // Saving refreshToken with current user
  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await foundUser.save();

  // if authorized successfully
  req.user = foundUser;

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    secure: true,
    //secure: false,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
  });

  // response to client
  return res.status(200).json({
    status: 'success',
    data: {
      accessToken: accessToken,
      fullName: foundUser.name || '',
      email: foundUser.email || '',
      phoneNumber: foundUser.phoneNumber || '',
      birthday: foundUser.birthday || '',
      gender: foundUser.gender || '',
      address: foundUser.address || '',
      userRole: foundUser.role || '',
      active: foundUser.status || '',
    },
  });

  next();
});

// protect handle

export const protect = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.userId);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist', 401));
  }
  // Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(req.jwtIssuedAt)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }
  // GRANT ACCESS TO PROTECT ROUTE
  req.user = currentUser;
  next();
});

// forgot password handle
export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return next(new AppError('There is no user with that email address.', 404));
  // 404 response code: server cannot find the requested resource
  // 2) Generate the random reset token
  // sign PasswordResetToken
  const verificationCode = crypto.randomBytes(3).toString('hex');
  const resetPasswordToken = signPasswordResetToken({ verificationCode });
  // 3) Send it to user's email
  const message = `
  Mã xác nhận của bạn là ${verificationCode}
  Vui lòng nhập mã này để có thể thay đổi mật khẩu.`;
  try {
    await sendEmail({
      email: foundUser.email,
      subject: 'Mã xác nhận của bạn (hiệu lực trong 10 phút)',
      message,
    });
    foundUser.passwordResetExpires = Date.now() + 10 * 60 * 1000; // now time + 10 minutes
    await foundUser.save(); // don't need to turn off the validator, we want  validator to confirm password is equal to passwordConfirm
    // response to client
    res.status(200).json({
      status: 'success',
      data: {
        resetPasswordToken,
      },
      message: 'Verification code sent to email',
    });
  } catch (err) {
    // reset token and expires property if error occurs
    foundUser.passwordResetToken = undefined;
    foundUser.passwordResetExpires = undefined;
    await foundUser.save({ validateBeforeSave: false });
    return next(new AppError('There was an error sending the email. Try again later!', 500));
    console.err(err);
  }
});

// validate verification code
export const validateVerificationCode = catchAsync(async (req, res, next) => {
  const foundUser = await User.findOne({ email: req.body.email });
  const resetPasswordToken = req.body.resetPasswordToken;
  // verify reset password token
  jwt.verify(resetPasswordToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // return res.sendStatus(403); // invalid token
      return next(err);
    }
    const { verificationCode } = decoded;
    if (verificationCode !== req.body.verificationCode)
      return next(new AppError('Invalid verification code. Please try again', 400));
    // create new reset password token, send to client (security)
    const newResetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
    // hash new reset password token, and save it to database
    foundUser.passwordResetToken = crypto.createHash('sha256').update(newResetPasswordToken).digest('hex');
    await foundUser.save({ validateBeforeSave: false });
    return res.status(200).json({
      status: 'success',
      data: {
        resetPasswordToken: newResetPasswordToken,
      },
    });
    next();
  });
});

// reset password handle
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const resetPasswordToken = req.body.resetPasswordToken;
  const hashedToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
  // find user
  const foundUser = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gte: Date.now() } });

  // 2) If token has not expired, and there is user, set the new password
  if (!foundUser) return next(new AppError('Token is invalid or has expired', 400));
  foundUser.password = req.body.password;
  foundUser.passwordConfirm = req.body.passwordConfirm;
  foundUser.passwordResetToken = undefined;
  foundUser.passwordResetExpires = undefined;
  // 3) Update changedPasswordAt property for the user
  foundUser.passwordChangedAt = Date.now() - 1000;
  await foundUser.save();
  // 4) Response to client
  return res.status(200).json({
    status: 'success',
    message: 'Reset password successfully.',
  });
});

// update password handle
export const updatePassword = (req, res, next) => {
  console.log('update password ...........');
  return res.status(202).json({ success: '1' });
  next();
};
