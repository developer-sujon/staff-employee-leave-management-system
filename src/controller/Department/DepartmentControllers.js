//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//External Lib Import
const DepartmentModel = require("../../model/Department/DepartmentModel");
const { CreateError } = require("../../helper/ErrorHandler");

const CheckAssociateService = require("../../services/Common/CheckAssociateService");
const CreateService = require("../../services/Common/CreateService");
const DropDownService = require("../../services/Common/DropDownService");
const ListService = require("../../services/Common/ListService");
const UpdateService = require("../../services/Common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const DetailsService = require("../../services/Common/DetailsService");
const ListQueryService = require("../../services/Common/ListQueryService");

/**
 * @desc Department Create
 * @access private
 * @route /api/v1/Department/DepartmentCreate
 * @methud POST
 */

const DepartmentCreate = async (req, res, next) => {
  try {
    const associal = await CheckAssociateService(
      { DepartmentName: req.body.DepartmentName },
      DepartmentModel,
    );

    if (associal) {
      throw CreateError("This Department Already Created");
    }

    const result = await CreateService(req, DepartmentModel);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Department List
 * @access private
 * @route /api/v1/Department/DepartmentList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const DepartmentList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [
    {
      DepartmentName: SearchRgx,
      DepartmentShortName: SearchRgx,
      DepartmentDetails: SearchRgx,
    },
  ];

  try {
    const result = await ListService(req, DepartmentModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Department Drop Down
 * @access private
 * @route /api/v1/Department/DepartmentDropDown
 * @methud GET
 */

const DepartmentDropDown = async (req, res, next) => {
  try {
    const result = await DropDownService(
      req,
      DepartmentModel,
      {
        DepartmentStatus: true,
      },
      {
        label: "$DepartmentName",
        value: "$_id",
      },
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Department Details
 * @access private
 * @route /api/v1/Department/DepartmentDetails/:id
 * @methud GET
 */

const DepartmentDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, DepartmentModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Department Update
 * @access private
 * @route /api/v1/Department/DepartmentUpdate/:id
 * @methud PATCH
 */

const DepartmentUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, DepartmentModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Department  Delete
 * @access private
 * @route /api/v1/Department/DepartmentDelete/:id
 * @methud DELETE
 */

const DepartmentDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, DepartmentModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  DepartmentCreate,
  DepartmentDropDown,
  DepartmentList,
  DepartmentDetails,
  DepartmentUpdate,
  DepartmentDelete,
};
