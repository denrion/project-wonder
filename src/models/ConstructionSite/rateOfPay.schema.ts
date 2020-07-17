import mongoose from 'mongoose';
import EmployeeQualification from '../../constants/EmployeeQualification';
import { IRateOfPayDocument } from './rateOfPay.types';

export const RateOfPaySchema = new mongoose.Schema<IRateOfPayDocument>(
  {
    qualification: {
      type: String,
      enum: Object.values(EmployeeQualification),
      required: [true, 'Qualification field is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount field is required'],
      min: [1, 'Amount cannot be lower than 1'],
      max: [20, 'Amount cannot be larger than 20'],
    },
  },
  {
    _id: false,
  }
);

export default RateOfPaySchema;
