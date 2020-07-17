import { Document, Model } from 'mongoose';

// Types for schema fields
interface IFinancialTransaction {
  date: Date;
  description: string;
  amount: number;
}

// Types for instance methods
export interface IFinancialTransactionDocument extends IFinancialTransaction, Document {}

// Types for static methods
export interface IFinancialTransactionModel extends Model<IFinancialTransactionDocument> {}
