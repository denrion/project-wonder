import { HookNextFunction } from 'mongoose';
import { IWageReportDocument } from './wageReports.types';

// ******************* DOCUMENT MIDDLEWARE ****************** //
export async function validateIfEmployeeInConstructionSite(
  this: IWageReportDocument,
  next: HookNextFunction
) {
  const {
    payrollReport: { constructionSite },
  } = await this.populate({
    path: 'payrollReport',
    select: 'constructionSite',
    populate: {
      path: 'constructionSite',
      select: 'employees',
    },
  }).execPopulate();

  if (!constructionSite.employees.includes(this.employee)) {
    this.invalidate(
      'employee',
      'Cannot add a wage report for an employee that does not belong to this construction site'
    );
  }

  next();
}

export async function setExhangeRate(this: IWageReportDocument, next: HookNextFunction) {
  await this.populate('payrollReport').execPopulate();

  this.exchangeRate = this.payrollReport.exchangeRate;

  next();
}

// ******************** QUERY MIDDLEWARE ******************* //

// **************** AGGREGATION MIDDLEWARE **************** //
