import { Router } from 'express';
import Role from '../constants/Role';
import {
  createConstructionSite,
  deleteConstructionSite,
  getAllConstructionSites,
  getConstructionSite,
  updateConstructionSite,
} from '../controllers/constructionSiteController';
import isAuth from '../middleware/isAuth';
import restrictTo from '../middleware/restrictTo';
import { financialReportRouter } from './financialReportRoutes';
import { payrollReportRouter } from './payrollReportRoutes';

const router = Router();

router.use('/:constructionSiteId/payrollReports', payrollReportRouter);
router.use('/:constructionSiteId/financialReports', financialReportRouter);

// Restrict all routes after this to admin users
router.use(isAuth, restrictTo(Role.ADMIN));

router.route('/').get(getAllConstructionSites).post(createConstructionSite);

router
  .route('/:id')
  .get(getConstructionSite)
  .patch(updateConstructionSite)
  .delete(deleteConstructionSite);

export { router as constructionSiteRouter };
