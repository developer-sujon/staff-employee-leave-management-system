//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//External Lib Import
const LeaveModel = require("../../model/Leave/LeaveModel");
const { CreateError } = require("../../helper/ErrorHandler");

const CheckAssociateService = require("../../services/Common/CheckAssociateService");
const CreateService = require("../../services/Common/CreateService");
const DropDownService = require("../../services/Common/DropDownService");
const LeaveListService = require("../../services/Common/LeaveListService");
const UpdateService = require("../../services/Common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const DetailsService = require("../../services/Common/DetailsService");
const DashboardSummaryEmployeeService = require("../../services/Summary/DashboardSummaryEmployeeService");
const FilterLeaveByStatusHodService = require("../../services/Common/FilterLeaveByStatusHodService");
const FilterLeaveByStatusAdminService = require("../../services/Common/FilterLeaveByStatusAdminService");

/**
 * @desc Leave Create
 * @access private
 * @route /api/v1/Leave/LeaveCreate
 * @methud POST
 */

const LeaveCreate = async (req, res, next) => {
  try {
    const result = await CreateService(req, LeaveModel);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveList
 * @access private
 * @route /api/v1/Leave/LeaveList
 * @methud GET
 */

const LeaveList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ LeaveDetails: SearchRgx, LeaveType: SearchRgx }];
  let MatchQuery = {};

  const JoinStageOne = {
    $lookup: {
      from: "employees",
      localField: "EmployeeId",
      foreignField: "_id",
      as: "Employee",
    },
  };

  const JoinStageTwo = {
    $lookup: {
      from: "leavetypes",
      localField: "LeaveType",
      foreignField: "_id",
      as: "LeaveType",
    },
  };

  const projection = {
    $project: {
      LeaveType: {
        $first: "$LeaveType.LeaveTypeName",
      },
      LeaveDetails: 1,
      NumOfDay: 1,
      HodStatus: 1,
      AdminStatus: 1,
      createdAt: 1,
      Employee: {
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    },
  };

  try {
    const result = await LeaveListService(
      req,
      LeaveModel,
      SearchArray,
      MatchQuery,
      JoinStageOne,
      JoinStageTwo,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveAdminList
 * @access private
 * @route /api/v1/Leave/LeaveAdminList
 * @methud GET
 */

const LeaveAdminList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ LeaveDetails: SearchRgx }];
  let MatchQuery = { HodStatus: "Approved" };

  const JoinStageOne = {
    $lookup: {
      from: "employees",
      localField: "EmployeeId",
      foreignField: "_id",
      as: "Employee",
    },
  };

  const JoinStageTwo = {
    $lookup: {
      from: "leavetypes",
      localField: "LeaveType",
      foreignField: "_id",
      as: "LeaveType",
    },
  };

  const projection = {
    $project: {
      LeaveType: {
        $first: "$LeaveType.LeaveTypeName",
      },
      LeaveDetails: 1,
      NumOfDay: 1,
      HodStatus: 1,
      AdminStatus: 1,
      createdAt: 1,
      Employee: {
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    },
  };

  try {
    const result = await LeaveListService(
      req,
      LeaveModel,
      SearchArray,
      MatchQuery,
      JoinStageOne,
      JoinStageTwo,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveListAdminByStatus
 * @access private
 * @route /api/v1/Leave/LeaveListAdmin/status
 * @methud POST
 */

const LeaveListAdminByStatus = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ LeaveDetails: SearchRgx, LeaveType: SearchRgx }];
  let MatchQuery = { AdminStatus: req.body.status };

  const JoinStageOne = {
    $lookup: {
      from: "employees",
      localField: "EmployeeId",
      foreignField: "_id",
      as: "Employee",
    },
  };

  const JoinStageTwo = {
    $lookup: {
      from: "leavetypes",
      localField: "LeaveType",
      foreignField: "_id",
      as: "LeaveType",
    },
  };

  const projection = {
    $project: {
      LeaveType: {
        $first: "$LeaveType.LeaveTypeName",
      },
      LeaveDetails: 1,
      NumOfDay: 1,
      HodStatus: 1,
      AdminStatus: 1,
      createdAt: 1,
      Employee: {
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    },
  };

  try {
    const result = await LeaveListService(
      req,
      LeaveModel,
      SearchArray,
      MatchQuery,
      JoinStageOne,
      JoinStageTwo,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveListHodByStatus
 * @access private
 * @route /api/v1/Leave/LeaveListHodByStatus/status
 * @methud POST
 */

const LeaveListHodByStatus = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ LeaveDetails: SearchRgx, LeaveType: SearchRgx }];
  let MatchQuery = { HodStatus: req.body.status };

  const JoinStageOne = {
    $lookup: {
      from: "employees",
      localField: "EmployeeId",
      foreignField: "_id",
      as: "Employee",
    },
  };

  const JoinStageTwo = {
    $lookup: {
      from: "leavetypes",
      localField: "LeaveType",
      foreignField: "_id",
      as: "LeaveType",
    },
  };

  const projection = {
    $project: {
      LeaveType: {
        $first: "$LeaveType.LeaveTypeName",
      },
      LeaveDetails: 1,
      NumOfDay: 1,
      HodStatus: 1,
      AdminStatus: 1,
      createdAt: 1,
      Employee: {
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    },
  };

  try {
    const result = await LeaveListService(
      req,
      LeaveModel,
      SearchArray,
      MatchQuery,
      JoinStageOne,
      JoinStageTwo,
      projection,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Leave Drop Down
 * @access private
 * @route /api/v1/Leave/LeaveDropDown
 * @methud GET
 */

const LeaveDropDown = async (req, res, next) => {
  try {
    const result = await DropDownService(
      req,
      LeaveModel,
      {
        LeaveStatus: true,
      },
      {
        label: "$LeaveName",
        value: "$LeaveSlug",
      },
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Leave Details
 * @access private
 * @route /api/v1/Leave/LeaveDetails/:id
 * @methud GET
 */

const LeaveDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Leave Update
 * @access private
 * @route /api/v1/Leave/LeaveUpdate/:id
 * @methud PATCH
 */

const LeaveUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Leave  Delete
 * @access private
 * @route /api/v1/Leave/LeaveDelete/:id
 * @methud DELETE
 */

const LeaveDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, LeaveModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LeaveCreate,
  LeaveList,
  LeaveAdminList,
  LeaveListAdminByStatus,
  LeaveListHodByStatus,
  LeaveDropDown,
  LeaveDetails,
  LeaveUpdate,
  LeaveDelete,
};
