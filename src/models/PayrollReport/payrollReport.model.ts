import { model } from 'mongoose';
import PayrollReportSchema from './payrollReport.schema';
import { IPayrollReportDocument, IPayrollReportModel } from './payrollReport.types';

const PayrollReport = model<IPayrollReportDocument, IPayrollReportModel>(
  'PayrollReport',
  PayrollReportSchema
);

export default PayrollReport;
