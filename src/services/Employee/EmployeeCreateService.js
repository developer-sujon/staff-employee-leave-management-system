//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");
const { HashPassword } = require("../../utility/BcryptHelper");
const EmployeeCreateService = async (Request, DataModel) => {
  let PostBody = Request.body;

  const Employee = await DataModel.aggregate([
    {
      $match: { Email: PostBody.Email },
    },
  ]);

  if (Employee.length > 0) {
    throw CreateError("Employee Already Created", 400);
  }

  PostBody.Password = await HashPassword(PostBody.Password);

  await DataModel.create(PostBody);
  return { message: "Employee Create Successfull" };
};
module.exports = EmployeeCreateService;
