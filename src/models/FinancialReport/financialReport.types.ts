import { Document, Model } from 'mongoose';
import { IConstructionSiteDocument } from '../ConstructionSite/constructionSite.types';
import { IFinancialTransactionDocument } from './financialTransaction.types';

// Types for schema fields
interface IFinancialReport {
  dateFrom: Date;
  dateTo: Date;
  transactions: IFinancialTransactionDocument[];
  constructionSite: IConstructionSiteDocument['_id'];
}

// Types for instance methods
export interface IFinancialReportDocument extends IFinancialReport, Document {}

// Types for static methods
export interface IFinancialReportModel extends Model<IFinancialReportDocument> {}
