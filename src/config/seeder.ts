import colors from 'colors';
import fs from 'fs';
import path from 'path';
import ConstructionSite from '../models/ConstructionSite/constructionSite.model';
import FinancialReport from '../models/FinancialReport/financialReport.model';
import PayrollReport from '../models/PayrollReport/payrollReport.model';
import User from '../models/User/user.model';
import WageReport from '../models/WageReports/wageReports.model';
import connectMongoDB from './connectMongoDB';
import './loadEnvironmentVariables';

connectMongoDB();

const users = JSON.parse(fs.readFileSync(path.resolve('__dev-data__', 'users.json'), 'utf-8'));
const constructionSites = JSON.parse(
  fs.readFileSync(path.resolve('__dev-data__', 'constructionSites.json'), 'utf-8')
);
const payrollReports = JSON.parse(
  fs.readFileSync(path.resolve('__dev-data__', 'payrollReports.json'), 'utf-8')
);
const wageReports = JSON.parse(
  fs.readFileSync(path.resolve('__dev-data__', 'wageReports.json'), 'utf-8')
);
const financialReports = JSON.parse(
  fs.readFileSync(path.resolve('__dev-data__', 'financialReports.json'), 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await ConstructionSite.create(constructionSites);
    await PayrollReport.create(payrollReports);
    await WageReport.create(wageReports);
    await FinancialReport.create(financialReports);
    console.log(colors.green.inverse('Data successfuly imported'));
  } catch (error) {
    console.error(colors.red(error));
  }
  process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await User.deleteMany({});
    await ConstructionSite.deleteMany({});
    await PayrollReport.deleteMany({});
    await WageReport.deleteMany({});
    await FinancialReport.deleteMany({});
    console.log(colors.red.inverse('Data successfuly deleted'));
  } catch (error) {
    console.error(colors.red(error));
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
