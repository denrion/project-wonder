import { Router } from 'express';
import FIND_FILTER_TYPE from '../constants/FindFilterType';
import Role from '../constants/Role';
import {
  createPayrollReport,
  deletePayrollReport,
  getAllPayrollReports,
  getPayrollReport,
  updatePayrollReport,
} from '../controllers/payrollReportController';
import isAuth from '../middleware/isAuth';
import restrictTo from '../middleware/restrictTo';
import setBodyFieldFromParam from '../middleware/setBodyFieldFromParam';
import setFindFilterFromRequest from '../middleware/setFindFilterFromRequest';
import { wageReportRouter } from './wageReportRoutes';

const router = Router({ mergeParams: true });

router.use('/:payrollReportId/wageReports', wageReportRouter);

// Restrict all routes after this to admin users
router.use(isAuth, restrictTo(Role.ADMIN));

router
  .route('/')
  .get(
    // PayrollReport.find({constructionSite: req.params.constructionSiteId})
    setFindFilterFromRequest('constructionSite', FIND_FILTER_TYPE.REQ_PARAMS, 'constructionSiteId'),
    getAllPayrollReports
  )
  .post(setBodyFieldFromParam('constructionSite', 'constructionSiteId'), createPayrollReport);

router.route('/:id').get(getPayrollReport).patch(updatePayrollReport).delete(deletePayrollReport);

export { router as payrollReportRouter };
