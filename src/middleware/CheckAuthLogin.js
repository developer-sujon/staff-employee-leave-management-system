//External Lib Import
const { ObjectId } = require("mongoose").Types;

//Internal Lib Import
const { CreateError } = require("../helper/ErrorHandler");
const DecodedToken = require("../utility/DecodedToken");
const EmployeeModel = require("../model/Employee/EmployeeModel");

/**
 * @desc CheckEmployeeAuth
 * @access public
 * @methud POST
 */
const CheckEmployeeAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token = authorization.split(" ")[1];
    const decoded = await DecodedToken(token);

    const Employee = await EmployeeModel.aggregate([
      {
        $match: { _id: ObjectId(decoded.id) },
      },
    ]);

    req.Email = Employee[0].Email;
    req.EmployeeId = Employee[0]._id;
    req.Password = Employee[0].Password;

    if (!Employee.length > 0) {
      throw CreateError("Invalid Credentials", 401);
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

/**
 * @desc CheckHodAuth
 * @access public
 * @methud POST
 */
const CheckHodAuth = async (req, res, next) => {
  try {
    const { Email } = req;

    const Staff = await EmployeeModel.aggregate([
      {
        $match: {
          $and: [{ Email: Email }, { Roles: "HOD" }],
        },
      },
    ]);

    if (!Staff.length > 0) {
      throw CreateError("Invalid Credentials", 401);
    }
    req.Roles = Staff[0].Roles;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

/**
 * @desc CheckAdminAuth
 * @access public
 * @methud POST
 */
const CheckAdminAuth = async (req, res, next) => {
  try {
    const { Email } = req;

    const admin = await EmployeeModel.aggregate([
      {
        $match: {
          $and: [{ Email: Email }, { Roles: "ADMIN" }],
        },
      },
    ]);

    if (!admin.length > 0) {
      throw CreateError("Invalid Credentials", 401);
    }
    req.Roles = admin[0].Roles;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  CheckEmployeeAuth,
  CheckHodAuth,
  CheckAdminAuth,
};
