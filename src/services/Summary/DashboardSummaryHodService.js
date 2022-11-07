//External Lib Import
const { ObjectId } = require("mongoose").Types;

const DashboardSummaryEmployeeHodService = async (Request, EmployeesModel) => {
  return await EmployeesModel.aggregate([
    {
      $facet: {
        Total: [{ $count: "count" }],
        Data: [
          {
            $group: {
              _id: "$HodStatus",
              count: { $count: {} },
            },
          },
        ],
      },
    },
  ]);
};

module.exports = DashboardSummaryEmployeeHodService;
