//External Lib Import
const { ObjectId } = require("mongoose").Types;

const EmployeeActiveService = async (Request, EmployeesModel) => {
  const EmployeeId = Request.id;

  return await EmployeesModel.updateOne(
    { _id: ObjectId(EmployeeId) },
    {
      AccountStatus: "ACTIVE",
    },
  );
};

module.exports = EmployeeActiveService;
