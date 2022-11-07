//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword, VerifyPassword } = require("../../utility/BcryptHelper");

const EmployeePasswordChangeService = async (Request, DataModel) => {
  const Email = Request.Email;
  let { PreviousPassword, NewPassword } = Request.body;

  const verifyPassword = await VerifyPassword(
    PreviousPassword,
    Request.Password,
  );

  if (!verifyPassword) {
    throw CreateError("Previous Password Not Match", 400);
  }

  NewPassword = await HashPassword(Request.body.NewPassword);

  await DataModel.updateOne(
    { Email: Email },
    { Password: NewPassword },
    { new: true },
  );

  return { message: "Employee Password Change Successfull" };
};
module.exports = EmployeePasswordChangeService;
