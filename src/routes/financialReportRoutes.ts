import { Router } from 'express';
import FIND_FILTER_TYPE from '../constants/FindFilterType';
import Role from '../constants/Role';
import {
  createFinancialReport,
  deleteFinancialReport,
  getAllFinancialReports,
  getFinancialReport,
  updateFinancialReport,
} from '../controllers/financialReportController';
import isAuth from '../middleware/isAuth';
import restrictTo from '../middleware/restrictTo';
import setBodyFieldFromParam from '../middleware/setBodyFieldFromParam';
import setFindFilterFromRequest from '../middleware/setFindFilterFromRequest';
import { financialTransactionRouter } from './financialTransactionRouter';

const router = Router({ mergeParams: true });

router.use('/:financalReportId/transactions', financialTransactionRouter);

// Restrict all routes after this to admin users
router.use(isAuth, restrictTo(Role.ADMIN));

router
  .route('/')
  .get(
    // FinancialReport.find({ constructionSite: req.params.constructionSiteId })
    setFindFilterFromRequest('constructionSite', FIND_FILTER_TYPE.REQ_PARAMS),
    getAllFinancialReports
  )
  .post(setBodyFieldFromParam('constructionSite'), createFinancialReport);

router
  .route('/:id')
  .get(getFinancialReport)
  .patch(updateFinancialReport)
  .delete(deleteFinancialReport);

export { router as financialReportRouter };
