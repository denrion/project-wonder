import { model } from 'mongoose';
import FinancialReportSchema from './financialReport.schema';
import { IFinancialReportDocument, IFinancialReportModel } from './financialReport.types';

const FinancialReport = model<IFinancialReportDocument, IFinancialReportModel>(
  'FinancialReport',
  FinancialReportSchema
);

export default FinancialReport;
