import { Schema } from 'mongoose';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import { slugifyConstructionSiteName, validateRatesOfPay } from './constructionSite.middleware';
import { IConstructionSiteDocument } from './constructionSite.types';
import RateOfPaySchema from './rateOfPay.schema';

const ConstructionSiteSchema = new Schema<IConstructionSiteDocument>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name field is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name must not be longer than 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description field is required'],
      trim: true,
      minlength: [2, 'Description must be at least 2 characters long'],
      maxlength: [500, 'Description must not be longer than 500 characters'],
    },
    coverImage: {
      type: String,
      default: 'placeholder.png',
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    dateOpened: {
      type: Date,
      default: Date.now(),
    },
    dateClosed: Date,
    ratesOfPay: [{ type: RateOfPaySchema }],
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    collection: 'construction_sites',
  }
);

// ************************ VIRTUALS ************************ //
ConstructionSiteSchema.virtual('payrollReports', {
  ref: 'PayrollReport',
  localField: '_id',
  foreignField: 'constructionSite',
});

ConstructionSiteSchema.virtual('financialReports', {
  ref: 'FinancialReport',
  localField: '_id',
  foreignField: 'constructionSite',
});

// ******************* DOCUMENT MIDDLEWARE ****************** //
ConstructionSiteSchema.pre('validate', validateRatesOfPay);
ConstructionSiteSchema.pre('save', slugifyConstructionSiteName);

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //

// ******************* INSTANCE METHONDS ******************* //

// ******************** STATIC METHODS ******************** //

// ************************ PLUGINS *********************** //
ConstructionSiteSchema.plugin(sanitizeMongooseFields);

export default ConstructionSiteSchema;
