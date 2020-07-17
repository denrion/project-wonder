import { Document, DocumentQuery, Model } from 'mongoose';
import EmployeeQualification from '../../constants/EmployeeQualification';
import Role from '../../constants/Role';
import { IConstructionSiteDocument } from '../ConstructionSite/constructionSite.types';

// Types for schema fields
interface IUser {
  firstName: string;
  lastName: string;
  qualification?: EmployeeQualification;
  email: string;
  role?: Role;
  password: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  // Virtuals
  passwordConfirm?: string;
  fullName: string;
  constructionSites: IConstructionSiteDocument[];
}

// Types for instance methods
export interface IUserDocument extends IUser, Document {
  isCorrectPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
  signToken: (this: IUserDocument) => string;
  createPasswordResetToken: (this: IUserDocument) => string;
  isPasswordChangedAfter: (this: IUserDocument, JWTTimestamp: Date) => boolean;
}

// Types for static methods
export interface IUserModel extends Model<IUserDocument> {
  findByEmail: (
    this: IUserModel,
    email: string
  ) => DocumentQuery<IUserDocument | null, IUserDocument, {}>;
}

export interface ISignupUserInput extends IUser {
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  email: IUser['email'];
  password: IUser['password'];
  passwordConfirm?: IUser['passwordConfirm'];
}

export interface ILoginCredentials {
  email: IUser['email'];
  password: IUser['password'];
}

export interface IForgottenPasswordInput {
  email: IUser['email'];
}

export interface IResetPasswordInput {
  password: IUser['password'];
  passwordConfirm: IUser['passwordConfirm'];
}

export interface IUpdateMyPasswordInput {
  oldPassword: IUser['password'];
  newPassword: IUser['password'];
  passwordConfirm: IUser['passwordConfirm'];
}
