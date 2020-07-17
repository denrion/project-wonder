import { Application } from 'express';
import { authRouter } from '../routes/authRoutes';
import { constructionSiteRouter } from '../routes/constructionSiteRoutes';
import { financialReportRouter } from '../routes/financialReportRoutes';
import { payrollReportRouter } from '../routes/payrollReportRoutes';
import { userRouter } from '../routes/userRoutes';
import { wageReportRouter } from '../routes/wageReportRoutes';

const setupRoutes = (app: Application) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/constructionSites', constructionSiteRouter);
  app.use('/api/v1/payrollReports', payrollReportRouter);
  app.use('/api/v1/wageReports', wageReportRouter);
  app.use('/api/v1/financialReports', financialReportRouter);
};

export default setupRoutes;
