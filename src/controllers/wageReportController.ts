import WageReport from '../models/WageReports/wageReports.model';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory';

/**
 * @desc      Get All Wage Reports
 * @route     GET /api/v1/wageReports
 * @access    Private
 */
export const getAllWageReports = getAll(WageReport);
/**
 * @desc      Get One Wage Report
 * @route     GET /api/v1/wageReport/:wageReportId
 * @access    Private
 */
export const getWageReport = getOne(WageReport);
/**
 * @desc      Create New Wage Report
 * @route     POST /api/v1/wageReports
 * @access    Private
 */
export const createWageReport = createOne(WageReport);
/**
 * @desc      Update Wage Report
 * @route     PATCH /api/v1/wageReports/:wageReportId
 * @access    Private
 */
export const updateWageReport = updateOne(WageReport);
/**
 * @desc      Delete Wage Report
 * @route     DELETE /api/v1/wageReports/:wageReportId
 * @access    Private
 */
export const deleteWageReport = deleteOne(WageReport);
