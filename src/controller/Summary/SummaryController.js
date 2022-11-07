//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//External Lib Import
const LeaveModel = require("../../model/Leave/LeaveModel");
const { CreateError } = require("../../helper/ErrorHandler");
const DashboardSummaryEmployeeService = require("../../services/Summary/DashboardSummaryEmployeeService");
const DashboardSummaryHodService = require("../../services/Summary/DashboardSummaryHodService");
const DashboardSummaryAdminService = require("../../services/Summary/DashboardSummaryAdminService");

/**
 * @desc Dashboard Summary Employee
 * @access private
 * @route /api/v1/Leave/DashboardSummaryEmployee
 * @methud DELETE
 */

const DashboardSummaryEmployee = async (req, res, next) => {
  try {
    const result = await DashboardSummaryEmployeeService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Dashboard Summary Employee Hod
 * @access private
 * @route /api/v1/Leave/DashboardSummaryHod
 * @methud DELETE
 */

const DashboardSummaryHod = async (req, res, next) => {
  try {
    const result = await DashboardSummaryHodService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Dashboard Summary Admin
 * @access private
 * @route /api/v1/Leave/DashboardSummaryAdmin
 * @methud DELETE
 */

const DashboardSummaryAdmin = async (req, res, next) => {
  try {
    const result = await DashboardSummaryAdminService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  DashboardSummaryEmployee,
  DashboardSummaryHod,
  DashboardSummaryAdmin,
};
