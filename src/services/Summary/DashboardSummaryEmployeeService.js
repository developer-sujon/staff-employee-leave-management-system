//External Lib Import
const { ObjectId } = require("mongoose").Types;

const DashboardSummaryEmployeeService = async (Request, EmployeesModel) => {
  const EmployeeId = Request.EmployeeId;

  return await EmployeesModel.aggregate([
    { $match: { EmployeeId: ObjectId(EmployeeId) } },
    {
      $facet: {
        Total: [{ $count: "count" }],
        Data: [
          {
            $group: {
              _id: "$AdminStatus",
              count: { $count: {} },
            },
          },
        ],
      },
    },
  ]);
};

module.exports = DashboardSummaryEmployeeService;
