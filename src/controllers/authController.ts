import crypto from 'crypto';
import status from 'http-status';
import ResponseStatus from '../constants/ResponseStatus';
import User from '../models/User/user.model';
import {
  IForgottenPasswordInput,
  ILoginCredentials,
  IResetPasswordInput,
  ISignupUserInput,
  IUpdateMyPasswordInput,
} from '../models/User/user.types';
import catchAsync from '../utils/catchAsync';
import createAndSendToken from '../utils/createAndSendToken';
import { sendPasswordResetEmail, sendWelcomeEmail } from '../utils/email/sendEmail';
import BadRequestError from '../utils/errors/BadRequestError';
import InternalServerError from '../utils/errors/InternalServerError';
import UnauthorizedError from '../utils/errors/UnauthorizedError';
import filterReqBody from '../utils/filterReqBody';

/**
 * @desc      Signup user
 * @route     POST /api/v1/auth/signup
 * @access    Public
 */
export const signup = catchAsync(async (req, res, next) => {
  // deconstruct fields that are not allowed
  // prevent user from submiting unwanted values
  // e.g prevent user from specifying role, defaults to user
  const {
    qualification,
    role,
    passwordChangedAt,
    passwordResetExpires,
    passwordResetToken,
    ...signupData
  } = req.body as ISignupUserInput;

  const user = await User.create(signupData);

  // Sending email asynchronously is intentional
  sendWelcomeEmail(user);

  createAndSendToken(user, status.CREATED, req, res);
});

/**
 * @desc      Login user
 * @route     POST /api/v1/auth/login
 * @access    Public
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body as ILoginCredentials;

  if (!email || !password) return next(new BadRequestError('Please provide email and password!'));

  const user = await User.findByEmail(email).select('+password');

  if (!user || !(await user.isCorrectPassword(password, user.password)))
    return next(new UnauthorizedError('Invalid credentials'));

  createAndSendToken(user, status.OK, req, res);
});

/**
 * @desc      Logout user
 * @route     GET /api/v1/auth/logout
 * @access    Private
 * @usage     Use to "delete" the jwt cookie if using cookies for storing jwt
 */
export const logout = catchAsync(async (req, res, next) => {
  res
    .status(status.OK)
    .cookie('jwt', 'LoggedOut', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    })
    .json({ status: ResponseStatus.SUCCESS });
});

/**
 * @desc      Forgot Password
 * @route     POST /api/v1/auth/forgotPassword
 * @access    Public
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on POSTed email
  const { email } = req.body as IForgottenPasswordInput;

  const user = await User.findByEmail(email);

  if (!user) return next(new BadRequestError('User with provided email does not exist'));

  // 2a) generate a random token
  const resetToken = user.createPasswordResetToken();

  // 2b) update user data in DB
  await user.save({ validateBeforeSave: false });

  // 3) send it back as an email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;

    await sendPasswordResetEmail(user, resetURL);

    res.status(status.OK).json({
      status: ResponseStatus.SUCCESS,
      message: 'Token sent to email',
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(new InternalServerError('There was an error sending an email. Try again later!'));
  }
});

/**
 * @desc      Reset Password
 * @route     PATCH /api/v1/auth/resetPassword/:token
 * @access    Public
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  // 2) If token valid && user exists -> set new password
  if (!user) return next(new BadRequestError('Token is invalid or has expired'));

  const { password, passwordConfirm } = req.body as IResetPasswordInput;

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Log the user in, send JWT to client
  createAndSendToken(user, status.OK, req, res);
});

/**
 * @desc      Get Current Logged In user
 * @route     GET /api/v1/auth/me
 * @access    Private
 */
export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(status.OK).json({
    success: ResponseStatus.SUCCESS,
    data: { user },
  });
});

/**
 * @desc     Update info about the currently logged in user
 * @route    PATCH /api/v1/auth/updateMe
 * @access   Private
 * @usage    e.g used to update current logged in user data on a profile page
 *           specify allowed fields to be updated as a 2nd param to filterReqBody
 */
export const updateMe = catchAsync(async (req, res, next) => {
  // Only allow update for specified fields
  const filteredBody = filterReqBody(req.body, 'email', 'firstName', 'lastName');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(status.OK).json({
    status: ResponseStatus.SUCCESS,
    data: { updatedUser },
  });
});

/**
 * @desc      Update Password of currently logged in user
 * @route     PATCH /api/v1/auth/updateMyPassword
 * @access    Private
 * @usage     e.g used to updated current logged in user's password on a profile page
 */
export const updateMyPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from DB by ID from req.user object set by isAuth middleware
  const user = await User.findById(req.user.id).select('+password');

  // 2a) Check if sent current password is correct
  const { oldPassword, newPassword, passwordConfirm } = req.body as IUpdateMyPasswordInput;

  if (!user || !(await user.isCorrectPassword(oldPassword, user.password)))
    return next(new UnauthorizedError('Invalid password'));

  // 2b) Check if new password is not the same as old password
  if (newPassword === oldPassword)
    return next(new BadRequestError('New password cannot be the same as old password'));

  // 3) if so, update password
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createAndSendToken(user, status.OK, req, res);
});
