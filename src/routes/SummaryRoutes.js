//External Lib Import
const SummaryRoutes = require("express").Router();
const SummaryControllers = require("../controller/Summary/SummaryController");
const {
  CheckEmployeeAuth,
  CheckAdminAuth,
  CheckHodAuth,
} = require("../middleware/CheckAuthLogin");

//Dashboard Summary Employee
SummaryRoutes.get(
  "/DashboardSummaryEmployee",
  CheckEmployeeAuth,
  SummaryControllers.DashboardSummaryEmployee,
);

//Dashboard Summary Employee Hod
SummaryRoutes.get(
  "/DashboardSummaryHod",
  CheckEmployeeAuth,
  CheckHodAuth,
  SummaryControllers.DashboardSummaryHod,
);

//Dashboard Summary Admin
SummaryRoutes.get(
  "/DashboardSummaryAdmin",
  CheckEmployeeAuth,
  CheckAdminAuth,
  SummaryControllers.DashboardSummaryAdmin,
);

module.exports = SummaryRoutes;
