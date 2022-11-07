//Internal Lib Import
const mongoose = require("mongoose");

//Internal Lib Import
const EmployeeModel = require("../../model/Employee/EmployeeModel");
const OtpModel = require("../../model/Otps/OtpModel");
const EmployeeCreateService = require("../../services/Employee/EmployeeCreateService");
const EmployeeDetailsService = require("../../services/Employee/EmployeeDetailsService");
const EmployeeUpdateService = require("../../services/Employee/EmployeeUpdateService");
const EmployeePasswordChangeService = require("../../services/Employee/EmployeePasswordChangeService");
const EmployeeDeleteService = require("../../services/Employee/EmployeeDeleteService");
const VerifyRecoveryOtpService = require("../../services/Employee/VerifyRecoveryOtpService");
const SendRecoveryOtpService = require("../../services/Employee/SendRecoveryOtpService");
const RecoveryResetPassService = require("../../services/Employee/RecoveryResetPassService");
const DetailsService = require("../../services/Common/DetailsService");
const UpdateService = require("../../services/Common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const EmployeeListService = require("../../services/Employee/EmployeeListService");
const ListQueryService = require("../../services/Common/ListQueryService");
const ListQueryJoinService = require("../../services/Common/ListQueryJoinService");

/**
 * @desc Employee Create
 * @access private
 * @route /api/v1/Employee/EmployeeCreate
 * @methud GET
 */
const EmployeeCreate = async (req, res, next) => {
  try {
    const result = await EmployeeCreateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee List
 * @access private
 * @route /api/v1/Employee/EmployeeList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const EmployeeList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [
    {
      FirstName: SearchRgx,
      LastName: SearchRgx,
      Gender: SearchRgx,
      Address: SearchRgx,
      Phone: SearchRgx,
      Email: SearchRgx,
    },
  ];

  try {
    const result = await EmployeeListService(req, EmployeeModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Details
 * @access private
 * @route /api/v1/Employee/EmployeeDetails
 * @methud GET
 */
const EmployeeDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Employee
 * @access private
 * @route /api/v1/Employee/EmployeeUpdate
 * @methud PATCH
 */
const EmployeeUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Profile Details
 * @access private
 * @route /api/v1/Profile/ProfileDetails
 * @methud GET
 */
const ProfileDetails = async (req, res, next) => {
  try {
    const result = await EmployeeDetailsService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Profile
 * @access private
 * @route /api/v1/Employee/ProfileUpdate
 * @methud PATCH
 */
const ProfileUpdate = async (req, res, next) => {
  try {
    const result = await EmployeeUpdateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Change Password
 * @access private
 * @route /api/v1/Employee/EmployeeChangePassword
 * @methud PUT
 */
const EmployeeChangePassword = async (req, res, next) => {
  try {
    const result = await EmployeePasswordChangeService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Delete
 * @access private
 * @route /api/v1/Employee/EmployeeDelete
 * @methud DELETE
 */

const EmployeeDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Send Recovery Otp
 * @access public
 * @route /api/v1/Employee/SendRecoveryOtp/:Email
 * @methud GET
 */

const SendRecoveryOtp = async (req, res, next) => {
  try {
    const result = await SendRecoveryOtpService(req, EmployeeModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Recovary Otp
 * @access public
 * @route /api/v1/Employee/VerifyRecoveryOtp/:/Email/:OtpCode
 * @methud GET
 */

const VerifyRecoveryOtp = async (req, res, next) => {
  try {
    const result = await VerifyRecoveryOtpService(req, OtpModel);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @desc Recovery Reset Password
 * @access public
 * @route /api/v1/Employee/RecoveryResetPass/:Email/:OtpCode
 * @methud POST
 */

const RecoveryResetPass = async (req, res, next) => {
  try {
    const result = await RecoveryResetPassService(req, EmployeeModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc DepartmentHeads
 * @access private
 * @route /api/v1/Employee/DepartmentHeads
 * @methud GET
 */

const DepartmentHeads = async (req, res, next) => {
  try {
    const MatchQuery = {
      $match: {
        Roles: "HOD",
      },
    };

    const JoinStage = {
      $lookup: {
        from: "departments",
        localField: "DepartmentId",
        foreignField: "_id",
        as: "Department",
      },
    };

    const projection = {
      $project: {
        Department: {
          $first: "$Department.DepartmentShortName",
        },
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    };

    const result = await ListQueryJoinService(
      req,
      EmployeeModel,
      MatchQuery,
      JoinStage,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc StaffList
 * @access private
 * @route /api/v1/Employee/StaffList
 * @methud GET
 */

const StaffList = async (req, res, next) => {
  try {
    const MatchQuery = {
      $match: {
        Roles: "STAFF",
      },
    };

    const JoinStage = {
      $lookup: {
        from: "departments",
        localField: "DepartmentId",
        foreignField: "_id",
        as: "Department",
      },
    };

    const projection = {
      $project: {
        Department: {
          $first: "$Department.DepartmentShortName",
        },
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    };

    const result = await ListQueryJoinService(
      req,
      EmployeeModel,
      MatchQuery,
      JoinStage,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  EmployeeCreate,
  EmployeeList,
  EmployeeDetails,
  ProfileDetails,
  ProfileUpdate,
  EmployeeChangePassword,
  EmployeeUpdate,
  EmployeeDelete,
  SendRecoveryOtp,
  VerifyRecoveryOtp,
  RecoveryResetPass,
  DepartmentHeads,
  StaffList,
};
