import { Schema } from 'mongoose';
import EmployeeQualification from '../../constants/EmployeeQualification';
import Role from '../../constants/Role';
import sanitizeMongooseFields from '../../utils/mongoose/sanitizeMongooseFields';
import sanitizeSpecifiedFields from '../../utils/mongoose/sanitizeSpecifiedFields';
import {
  createPasswordResetToken,
  isCorrectPassword,
  isPasswordChangedAfter,
  signToken,
} from './user.methods';
import { hashPassword, updatePaswordChangedAt, validatePasswordConfirm } from './user.middleware';
import { findByEmail } from './user.statics';
import { IUserDocument } from './user.types';

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'First name field is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [30, 'First name must not be longer than 30 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name field is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [50, 'Last name must not be longer than 50 characters'],
    },
    qualification: {
      type: String,
      enum: Object.values(EmployeeQualification),
      required: [true, 'Qualification field is required'],
      uppercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.EMPLOYEE,
      required: [true, 'Role field is required'],
      uppercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      maxlength: [50, 'Password must not be longer than 50 characters'],
      match: [
        /^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$/,
        'Password can only contain letters, numbers, underscores and dashes',
      ],
      select: false,
    },
    passwordChangedAt: { type: Date, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
  }
);

// ************************ VIRTUALS ************************ //
UserSchema.virtual('passwordConfirm')
  .get(function (this: IUserDocument & { _passwordConfirm: string }) {
    return this._passwordConfirm;
  })
  .set(function (this: IUserDocument & { _passwordConfirm: string }, value: string) {
    this._passwordConfirm = value;
  });

UserSchema.virtual('fullName').get(function (this: IUserDocument) {
  return !this.firstName ?? !this.lastName ? undefined : `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('constructionSites', {
  ref: 'ConstructionSite',
  localField: '_id',
  foreignField: 'employees',
  justOne: false,
});

// ******************* DOCUMENT MIDDLEWARE ****************** //
UserSchema.pre('save', hashPassword);
UserSchema.pre('save', updatePaswordChangedAt);
UserSchema.pre('validate', validatePasswordConfirm);

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //

// ******************* INSTANCE METHONDS ******************* //
UserSchema.methods.isCorrectPassword = isCorrectPassword;
UserSchema.methods.signToken = signToken;
UserSchema.methods.isPasswordChangedAfter = isPasswordChangedAfter;
UserSchema.methods.createPasswordResetToken = createPasswordResetToken;

// ******************** STATIC METHODS ******************** //
UserSchema.statics.findByEmail = findByEmail;

// ************************ PLUGINS *********************** //
UserSchema.plugin(sanitizeMongooseFields);
UserSchema.plugin(sanitizeSpecifiedFields, [
  'password',
  'passwordConfirm',
  'passwordChangedAt',
  'passwordResetToken',
  'passwordResetExpires',
]);

export default UserSchema;
