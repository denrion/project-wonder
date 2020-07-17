import ConstructionSite from '../models/ConstructionSite/constructionSite.model';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory';

/**
 * @desc      Get All Costruction Sites
 * @route     GET /api/v1/constructionSites
 * @access    Private
 */
export const getAllConstructionSites = getAll(ConstructionSite);

/**
 * @desc      Get Costruction Site
 * @route     GET /api/v1/constructionSites/:constructionSiteId
 * @access    Private
 */
export const getConstructionSite = getOne(ConstructionSite, {
  path: 'employees payrollReports financialReports',
  select: '-role -email',
  populate: { path: 'wageReports' },
});

/**
 * @desc      Create New Costruction Site
 * @route     POST /api/v1/constructionSites
 * @access    Private
 */
export const createConstructionSite = createOne(ConstructionSite);

/**
 * @desc      Update Costruction Site
 * @route     PATCH /api/v1/constructionSites/:constructionSideId
 * @access    Private
 */
export const updateConstructionSite = updateOne(ConstructionSite);

/**
 * @desc      Delete Costruction Site
 * @route     DELETE /api/v1/constructionSites/:constructionSideId
 * @access    Private
 */
export const deleteConstructionSite = deleteOne(ConstructionSite);
