import { Document, Model } from 'mongoose';
import { IConstructionSiteDocument } from '../ConstructionSite/constructionSite.types';

// Types for schema fields
interface IPayrollReport {
  dateFrom: Date;
  dateTo: Date;
  exchangeRate: number;
  constructionSite: IConstructionSiteDocument['_id'];
}

// Types for instance methods
export interface IPayrollReportDocument extends IPayrollReport, Document {}

// Types for static methods
export interface IPayrollReportModel extends Model<IPayrollReportDocument> {}
