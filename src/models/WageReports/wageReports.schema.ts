import { Schema, Types } from 'mongoose';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import { setExhangeRate, validateIfEmployeeInConstructionSite } from './wageReports.middleware';
import { IWageReportDocument } from './wageReports.types';

const WageReportSchema = new Schema<IWageReportDocument>(
  {
    workHours: {
      type: Number,
      required: [true, 'Work Hours field is required'],
      default: 0,
      min: [0, 'Work hours cannot be negative'],
      max: [200, 'Work hours cannot be more than 200'],
    },
    rateOfPay: {
      type: Number,
      required: [true, 'Rate Of Pay field is required'],
    },
    exchangeRate: {
      type: Number,
      default: 127,
      min: [100, 'Exchange rate cannot less than 100'],
      max: [130, 'Exchange rate cannot be more than 130'],
    },
    advancePaymentEUR: {
      type: Number,
      default: function (this: IWageReportDocument & { _advancePaymentRSD: number }) {
        return this.advancePaymentRSD ? this.advancePaymentRSD / this.exchangeRate : 0;
      },
      min: [0, 'Advance payment (₡) cannot be negative'],
      max: [1000, 'Advance payment (₡) cannot be more than 1000'],
    },
    payrollReport: {
      type: Types.ObjectId,
      ref: 'PayrollReport',
      required: [true, 'Payroll Report field is required'],
    },
    employee: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Employee field is required'],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    collection: 'wage_reports',
  }
);

WageReportSchema.index({ payrollReport: 1, employee: 1 }, { unique: true });

// ************************ VIRTUALS ************************ //
WageReportSchema.virtual('advancePaymentRSD')
  .get(function (this: IWageReportDocument & { _advancePaymentRSD: number }) {
    return this._advancePaymentRSD
      ? this._advancePaymentRSD
      : this.advancePaymentEUR * this.exchangeRate;
  })
  .set(function (this: IWageReportDocument & { _advancePaymentRSD: number }, value: number) {
    this._advancePaymentRSD = value;
  });

WageReportSchema.virtual('grossWageEUR').get(function (this: IWageReportDocument) {
  return this.workHours * this.rateOfPay;
});

WageReportSchema.virtual('grossWageRSD').get(function (this: IWageReportDocument) {
  return this.grossWageEUR * this.exchangeRate;
});

WageReportSchema.virtual('netWageEUR').get(function (this: IWageReportDocument) {
  return this.grossWageEUR - this.advancePaymentEUR;
});

WageReportSchema.virtual('netWageRSD').get(function (this: IWageReportDocument) {
  return this.grossWageRSD - this.advancePaymentRSD;
});

// ******************* DOCUMENT MIDDLEWARE ****************** //
WageReportSchema.pre('validate', validateIfEmployeeInConstructionSite);
WageReportSchema.pre('save', setExhangeRate);

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //

// ******************* INSTANCE METHONDS ******************* //

// ******************** STATIC METHODS ******************** //

// ************************ PLUGINS *********************** //
WageReportSchema.plugin(sanitizeMongooseFields);

export default WageReportSchema;
