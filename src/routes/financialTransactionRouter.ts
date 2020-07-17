import { Router } from 'express';
import Role from '../constants/Role';
import {
  addTransactionToFinancialReport,
  removeTransactionFromFinancialReport,
} from '../controllers/financialReportController';
import isAuth from '../middleware/isAuth';
import restrictTo from '../middleware/restrictTo';

const router = Router({ mergeParams: true });

// Restrict all routes after this to admin users
router.use(isAuth, restrictTo(Role.ADMIN));

router.route('/').patch(addTransactionToFinancialReport);

router.route('/:transactionId').patch(removeTransactionFromFinancialReport);

export { router as financialTransactionRouter };
