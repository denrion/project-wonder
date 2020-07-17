import { Schema } from 'mongoose';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import { IPayrollReportDocument } from './payrollReport.types';
import { dateFromValidators, dateToValidators } from './payrollReport.validators';

const PayrollReportSchema = new Schema<IPayrollReportDocument>(
  {
    dateFrom: {
      type: Date,
      validate: dateFromValidators,
    },
    dateTo: {
      type: Date,
      validate: dateToValidators,
    },
    exchangeRate: {
      type: Number,
      required: [true, 'Exchange rate field is required'],
      min: [100, 'Exchange rate cannot less than 100'],
      max: [130, 'Exchange rate cannot be more than 130'],
    },
    constructionSite: {
      type: Schema.Types.ObjectId,
      ref: 'ConstructionSite',
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    collection: 'payroll_reports',
  }
);

PayrollReportSchema.index({ dateFrom: 1, dateTo: 1, constructionSite: 1 }, { unique: true });

// ************************ VIRTUALS ************************ //
PayrollReportSchema.virtual('wageReports', {
  ref: 'WageReport',
  localField: '_id',
  foreignField: 'payrollReport',
});

// ******************* DOCUMENT MIDDLEWARE ****************** //

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //

// ******************* INSTANCE METHONDS ******************* //

// ******************** STATIC METHODS ******************** //

// ************************ PLUGINS *********************** //
PayrollReportSchema.plugin(sanitizeMongooseFields);

export default PayrollReportSchema;
