import PayrollReport from '../models/PayrollReport/payrollReport.model';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory';

/**
 * @desc      Get All Payroll Reports
 * @route     GET /api/v1/payrollReports
 * @access    Private
 */
export const getAllPayrollReports = getAll(PayrollReport);

/**
 *
 * @desc      Get One Payroll Report
 * @route     GET /api/v1/payrollReport/:payrollReportId
 * @access    Private
 */
export const getPayrollReport = getOne(PayrollReport, { path: 'wageReports' });

/**
 * @desc      Create New Payroll Report
 * @route     POST /api/v1/payrollReports
 * @access    Private
 */
export const createPayrollReport = createOne(PayrollReport);

/**
 * @desc      Update Payroll Report
 * @route     PATCH /api/v1/payrollReports/:payrollReportId
 * @access    Private
 */
export const updatePayrollReport = updateOne(PayrollReport);

/**
 * @desc      Delete Payroll Report
 * @route     DELETE /api/v1/payrollReports/:payrollReportId
 * @access    Private
 */
export const deletePayrollReport = deleteOne(PayrollReport);
