import { HookNextFunction } from 'mongoose';
import slugify from 'slugify';
import EmployeeQualification from '../../constants/EmployeeQualification';
import isArrayOfUniqueObjects from '../../utils/helpers/isArrayOfUniqueObjects';
import { IConstructionSiteDocument } from './constructionSite.types';

// ******************* DOCUMENT MIDDLEWARE ****************** /
export function slugifyConstructionSiteName(
  this: IConstructionSiteDocument,
  next: HookNextFunction
) {
  this.slug = slugify(this.name, { lower: true });
  next();
}

export function validateRatesOfPay(this: IConstructionSiteDocument, next: HookNextFunction) {
  if (!this.ratesOfPay || this.ratesOfPay.length !== Object.keys(EmployeeQualification).length)
    this.invalidate(
      'ratesOfPay',
      `Must have exactly ${Object.keys(EmployeeQualification).length} elements`
    );

  if (!isArrayOfUniqueObjects(this.ratesOfPay, 'qualification'))
    this.invalidate('ratesOfPay', 'Must not have duplicate qualifications');

  next();
}

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //
