//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const ListByLImitService = async (
  Request,
  DataModel,
  MatchQuery,
  JoinStageOne,
  JoinStageTwo,
  JoinStageThree,
  projection,
  sortIng,
) => {
  const EmployeeId = Request.EmployeeId;

  const data = await DataModel.aggregate([
    {
      $match: {
        $and: [MatchQuery],
      },
    },
    { $sort: sortIng },
    { $limit: 10 },
    JoinStageOne,
    JoinStageTwo,
    JoinStageThree,
    projection,
  ]);

  return data;
};

module.exports = ListByLImitService;
