//External Lib Import
const { ObjectId } = require("mongoose").Types;

const EmployeeBlockService = async (Request, EmployeesModel) => {
  const EmployeeId = Request.id;

  return await EmployeesModel.updateOne(
    { _id: ObjectId(EmployeeId) },
    {
      AccountStatus: "REJECTED",
    },
  );
};

module.exports = EmployeeBlockService;
