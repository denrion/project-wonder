import { Router } from 'express';
import FIND_FILTER_TYPE from '../constants/FindFilterType';
import Role from '../constants/Role';
import {
  createWageReport,
  deleteWageReport,
  getAllWageReports,
  getWageReport,
  updateWageReport,
} from '../controllers/wageReportController';
import isAuth from '../middleware/isAuth';
import restrictTo from '../middleware/restrictTo';
import setBodyFieldFromParam from '../middleware/setBodyFieldFromParam';
import setFindFilterFromRequest from '../middleware/setFindFilterFromRequest';

const router = Router({ mergeParams: true });

// Restrict all routes after this to admin users
router.use(isAuth, restrictTo(Role.ADMIN));

router
  .route('/')
  .get(
    // WageReport.find({payrollReport: req.params.payrollReportId})
    setFindFilterFromRequest('payrollReport', FIND_FILTER_TYPE.REQ_PARAMS),
    getAllWageReports
  )
  .post(setBodyFieldFromParam('payrollReport'), createWageReport);

router.route('/:id').get(getWageReport).patch(updateWageReport).delete(deleteWageReport);

export { router as wageReportRouter };
