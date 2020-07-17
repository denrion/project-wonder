import { Schema } from 'mongoose';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import { IFinancialTransactionDocument } from './financialTransaction.types';

const FinancialTransactionSchema = new Schema<IFinancialTransactionDocument>(
  {
    date: {
      type: Date,
      required: [true, 'Date field is required'],
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, 'Description field is required'],
      trim: true,
      minlength: [2, 'Description must contain at least 2 characters'],
      maxlength: [200, 'Description must not contain more than 200 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount field is required'],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// ************************ PLUGINS *********************** //
FinancialTransactionSchema.plugin(sanitizeMongooseFields);

export default FinancialTransactionSchema;
