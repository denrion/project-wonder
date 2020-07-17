import express from 'express';
import {
  forgotPassword,
  getMe,
  login,
  logout,
  resetPassword,
  signup,
  updateMe,
  updateMyPassword,
} from '../controllers/authController';
import isAuth from '../middleware/isAuth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Routes below will go through isAuth middleware first
router.use(isAuth);

router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.patch('/updateMyPassword', updateMyPassword);

export { router as authRouter };
