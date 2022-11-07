//External Lib Import
const { ObjectId } = require("mongoose").Types;

const EmployeeDetailsService = async (Request, DataModel) => {
  const { EmployeeId } = Request;

  return await DataModel.aggregate([
    { $match: { _id: ObjectId(EmployeeId) } },
    {
      $project: {
        Password: 0,
      },
    },
  ]);
};
module.exports = EmployeeDetailsService;
