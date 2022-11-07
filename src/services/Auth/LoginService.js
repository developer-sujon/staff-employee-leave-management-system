//Internal Lib Import
const CreateToken = require("../../utility/CreateToken");
const { CreateError } = require("../../helper/ErrorHandler");
const { VerifyPassword } = require("../../utility/BcryptHelper");

const LoginService = async (Request, DataModel) => {
  const { Email, Password } = Request.body;

  if (!Email || !Password) {
    throw CreateError("Invalid Data", 400);
  }
  const User = await DataModel.aggregate([{ $match: { Email } }]);

  if (!User.length > 0) {
    throw CreateError("User Not found", 404);
  }

  const verifyPassword = await VerifyPassword(Password, User[0].Password);
  if (!verifyPassword) {
    throw CreateError("Unauthorized Credentials", 401);
  }

  const payLoad = {
    id: User[0]._id,
  };

  delete User[0].Password;

  const token = await CreateToken(payLoad);

  return { AccessToken: token, UserDetails: User[0] };
};

module.exports = LoginService;
