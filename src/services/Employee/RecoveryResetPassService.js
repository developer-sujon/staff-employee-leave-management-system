//External Lib Import
const bcrypt = require("bcrypt");

//Internal Import
const { CreateError } = require("../../helper/ErrorHandler");

const RecoveryResetPassService = async (Request, EmployeesModel, OtpModel) => {
  const { OtpCode, Email } = Request.params;
  let { Password } = Request.body;

  if (!Password) {
    throw CreateError("Invalid Data", 400);
  }

  const countOtp = await OtpModel.aggregate([
    {
      $match: {
        $and: [{ Email: Email }, { OtpCode: OtpCode }, { OtpStatus: 1 }],
      },
    },
  ]);

  if (!countOtp.length > 0) {
    throw CreateError("Invalid Otp Code", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Password, salt);
  Password = hash;

  await EmployeesModel.updateOne(
    { Email: Email },
    {
      Password: Password,
    },
    { new: true },
  );

  return { message: "Password Reset Successfull" };
};
module.exports = RecoveryResetPassService;
