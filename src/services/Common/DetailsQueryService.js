//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const DetailsQueryService = async (
  Request,
  DataModel,
  MatchQuery,
  JoinStageOne,
  JoinStageTwo,
  JoinStageThree,
  projection,
) => {
  await DataModel.updateOne(
    MatchQuery,
    { $inc: { numView: 1 } },
    { new: true },
  );

  const data = await DataModel.aggregate([
    {
      $match: {
        $and: [MatchQuery],
      },
    },
    JoinStageOne,
    JoinStageTwo,
    JoinStageThree,
    projection,
  ]);

  return data;
};

module.exports = DetailsQueryService;
