import { Schema } from 'mongoose';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import { dateFromValidators, dateToValidators } from './financialReport.validators';
import FinancialTransactionSchema from './financialTransaction.schema';
import { IFinancialTransactionDocument } from './financialTransaction.types';

const FinancialReportSchema = new Schema<IFinancialTransactionDocument>(
  {
    dateFrom: {
      type: Date,
      validate: dateFromValidators,
    },
    dateTo: {
      type: Date,
      validate: dateToValidators,
    },
    transactions: [
      { type: FinancialTransactionSchema, required: [true, 'Transactions field is required'] },
    ],
    constructionSite: {
      type: Schema.Types.ObjectId,
      ref: 'ConstructionSite',
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    collection: 'financial_reports',
  }
);

FinancialReportSchema.index({ dateFrom: 1, dateTo: 1, constructionSite: 1 }, { unique: true });

// ************************ VIRTUALS ************************ //

// ******************* DOCUMENT MIDDLEWARE ****************** //

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //

// ******************* INSTANCE METHONDS ******************* //

// ******************** STATIC METHODS ******************** //

// ************************ PLUGINS *********************** //
FinancialReportSchema.plugin(sanitizeMongooseFields);

export default FinancialReportSchema;
