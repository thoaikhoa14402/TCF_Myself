import AppError from '../utilities/appError.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { signAccessToken, signRefreshToken } from '../utilities/signJWT.js';

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });

  const foundUser = await User.findOne({ refreshToken });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) res.sendStatus(403); // forbidden
      console.log('attempted refresh token reuse!');
      const hackedUser = await User.findById(decoded.id);
      hackedUser.refreshToken = [];
      await hackedUser.save();
    });
    return res.sendStatus(403); // forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);

  // Evaluate refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log('Expired refresh token');
      foundUser.refreshToken = [...newRefreshTokenArray];
    }
    if (err || String(foundUser._id) !== decoded.id) return res.sendStatus(403); // typeof foundUser._id === object
    // Refresh token was still valid
    const accessToken = signAccessToken({ id: foundUser._id, role: foundUser.role });
    const newRefreshToken = signRefreshToken({ id: foundUser._id, role: foundUser.role });

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    // Create secure cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      //secure: true,
      secure: false,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Response to client
    return res.status(200).json({
      status: 'success',
      accessToken: accessToken,
      userRole: foundUser.role,
    });
  });
};
