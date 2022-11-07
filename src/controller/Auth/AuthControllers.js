//Internal Lib Import
const EmployeeModel = require("../../model/Employee/EmployeeModel");
const RegistrationService = require("../../services/Auth/RegistrationService");
const LoginService = require("../../services/Auth/LoginService");

/**
 * @desc Login User
 * @access public
 * @route /api/v1/Auth/LoginUser
 * @methud POST
 */

const LoginUser = async (req, res, next) => {
  try {
    const result = await LoginService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LoginUser,
};
