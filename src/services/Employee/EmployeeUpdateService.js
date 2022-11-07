//External Lib Import
const { ObjectId } = require("mongoose").Types;

const EmployeeUpdateService = async (Request, DataModel) => {
  const { EmployeeId } = Request;
  const {
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    Address,
    Phone,
    Image,
    Email,
  } = Request.body;

  await DataModel.findByIdAndUpdate(
    { _id: ObjectId(EmployeeId) },
    {
      Email,
      FirstName,
      LastName,
      Gender,
      DateOfBirth,
      Address,
      Phone,
      Image,
    },
    { new: true },
  );

  return { message: "Employee Update Successfull" };
};
module.exports = EmployeeUpdateService;
