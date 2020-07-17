import status from 'http-status';
import ResponseStatus from '../constants/ResponseStatus';
import FinancialReport from '../models/FinancialReport/financialReport.model';
import catchAsync from '../utils/catchAsync';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory';

/**
 * @desc      Add Transaction To Specific Financial Report
 * @route     PATCH /api/v1/financialReports/:financialReportId/transactions
 * @access    Private
 */
export const addTransactionToFinancialReport = catchAsync<{
  financalReportId: string;
}>(async (req, res, next) => {
  const { financalReportId } = req.params;

  const financialReport = await FinancialReport.findByIdAndUpdate(
    financalReportId,
    { $push: { transactions: req.body } },
    { new: true, runValidators: true }
  );

  res.status(status.OK).json({
    status: ResponseStatus.SUCCESS,
    data: { financialReport },
  });
});

/**
 * @desc      Remove Transaction From Specific Financial Report
 * @route     PATCH /api/v1/financialReports/:financialReportId/transactions/:transactionId
 * @access    Private
 */
export const removeTransactionFromFinancialReport = catchAsync<{
  financalReportId: string;
  transactionId: string;
}>(async (req, res, next) => {
  const { financalReportId, transactionId } = req.params;

  const financialReport = await FinancialReport.findByIdAndUpdate(
    financalReportId,
    { $pull: { transactions: { _id: transactionId } } },
    { new: true, runValidators: true }
  );

  res.status(status.OK).json({
    status: ResponseStatus.SUCCESS,
    data: { financialReport },
  });
});

/**
 * @desc      Get All Financial Reports
 * @route     GET /api/v1/financialReports
 * @access    Private
 */
export const getAllFinancialReports = getAll(FinancialReport);

/**
 * @desc      Get One Financial Report
 * @route     GET /api/v1/financialReport/:financialReportId
 * @access    Private
 */
export const getFinancialReport = getOne(FinancialReport);

/**
 * @desc      Create New Financial Report
 * @route     POST /api/v1/financialReports
 * @access    Private
 */
export const createFinancialReport = createOne(FinancialReport);

/**
 * @desc      Update Financial Report
 * @route     PATCH /api/v1/financialReports/:financialReportId
 * @access    Private
 */
export const updateFinancialReport = updateOne(FinancialReport);

/**
 * @desc      Delete Financial Report
 * @route     DELETE /api/v1/financialReports/:financialReportId
 * @access    Private
 */
export const deleteFinancialReport = deleteOne(FinancialReport);
