import { Document, Model } from 'mongoose';
import EmployeeQualification from '../../constants/EmployeeQualification';

// Types for schema fields
interface IRateOfPay {
  qualification: EmployeeQualification;
  amount: number;
}

// Types for instance methods
export interface IRateOfPayDocument extends IRateOfPay, Document {}

// Types for static methods
export interface IRateOfPayModel extends Model<IRateOfPayDocument> {}
