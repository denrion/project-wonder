import { Document, Model } from 'mongoose';
import { IPayrollReportDocument } from '../PayrollReport/payrollReport.types';
import { IUserDocument } from '../User/user.types';

// Types for schema fields
interface IWageReport {
  workHours: number;
  rateOfPay: number;
  exchangeRate: number;
  advancePaymentEUR: number;
  payrollReport: IPayrollReportDocument['_id'];
  employee: IUserDocument['_id'];

  // Virtuals
  advancePaymentRSD: number;
  grossWageEUR: number;
  grossWageRSD: number;
  netWageEUR: number;
  netWageRSD: number;
}

// Types for instance methods
export interface IWageReportDocument extends IWageReport, Document {}

// Types for static methods
export interface IWageReportModel extends Model<IWageReportDocument> {}
