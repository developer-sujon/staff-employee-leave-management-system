//External Lib Import
const { ObjectId } = require("mongoose").Types;

const DashboardSummaryAdminService = async (Request, DataModel) => {
  return await DataModel.aggregate([
    { $match: { HodStatus: "Approved" } },
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

module.exports = DashboardSummaryAdminService;
