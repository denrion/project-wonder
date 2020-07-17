import User from '../models/User/user.model';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory';

/**
 * @desc      Get All Users
 * @route     GET /api/v1/users
 * @access    Private
 */
export const getAllUsers = getAll(User);

/**
 * @desc      Get User By Id
 * @route     GET /api/v1/users/:userId
 * @access    Private
 */
export const getUser = getOne(User, { path: 'constructionSites' });

/**
 * @desc      Create New User
 * @route     POST /api/v1/users
 * @access    Private
 */
export const createUser = createOne(User);

/**
 * @desc      Update user
 * @route     PATHS /api/v1/users/:userId
 * @access    Private
 */
export const updateUser = updateOne(User);

/**
 * @desc      Delete User
 * @route     DELETE /api/v1/users/:userId
 * @access    Private
 */
export const deleteUser = deleteOne(User);
