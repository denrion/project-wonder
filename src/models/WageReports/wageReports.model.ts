import { model } from 'mongoose';
import WageReportSchema from './wageReports.schema';
import { IWageReportDocument, IWageReportModel } from './wageReports.types';

const WageReport = model<IWageReportDocument, IWageReportModel>('WageReport', WageReportSchema);

export default WageReport;
