//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword } = require("../../utility/BcryptHelper");

const RegistrationService = async (Request, EmployeesModel) => {
  const { Name, Phone, Email, Password } = Request.body;

  const newEmployee = new EmployeesModel({
    Name: Name,
    Phone: Phone,
    Email: Email,
    Password: Password,
  });

  if (!Name || !Phone || !Email || !Password) {
    throw CreateError("Invalid Data", 400);
  }

  const exitEmployee = await EmployeesModel.aggregate([
    { $match: { $or: [{ Email: Email }, { Phone: Phone }] } },
  ]);

  if (exitEmployee && exitEmployee.length > 0) {
    throw CreateError("Employee Already Register", 400);
  }
  newEmployee.Password = await HashPassword(Password);

  const Employee = await newEmployee.save();
  delete Employee._doc.Password;

  return Employee;
};

module.exports = RegistrationService;
