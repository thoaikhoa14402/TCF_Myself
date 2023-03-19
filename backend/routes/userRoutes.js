import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';
import { restrictAccessForCustomer, restrictAccessForAdmin } from '../middleware/restrictAccess.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { refreshToken } from '../controllers/refreshTokenController.js';

// Renew new access token and new refresh token
router.get('/refreshToken', refreshToken);

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login, restrictAccessForCustomer);

// Forgot password route
router.post('/forgotPassword', authController.forgotPassword);

// Verify verification code (for reset password)
router.post('/verifyCode', authController.validateVerificationCode);

// Reset password route
router.patch('/resetPassword', authController.resetPassword);

// Validate verification code

// Update password route
router.patch(
  '/updateMyPassword',
  verifyJWT,
  restrictAccessForCustomer,
  authController.protect,
  authController.updatePassword
);

// Update current user's data route

// Get user info route

export default router;
