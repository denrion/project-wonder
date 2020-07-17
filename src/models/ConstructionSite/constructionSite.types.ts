import { Document, Model } from 'mongoose';
import { IUserDocument } from '../User/user.types';
import { IRateOfPayDocument } from './rateOfPay.types';

// Types for schema fields
interface IConstructionSite {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  active: boolean;
  dateOpened: Date;
  dateClosed: Date;
  ratesOfPay: IRateOfPayDocument[];
  employees: IUserDocument['_id'][];
}

// Types for instance methods
export interface IConstructionSiteDocument extends IConstructionSite, Document {}

// Types for static methods
export interface IConstructionSiteModel extends Model<IConstructionSiteDocument> {}
