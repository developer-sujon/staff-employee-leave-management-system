const ListQueryJoinService = async (
  Request,
  DataModel,
  MatchQuery,
  JoinStage,
  projection,
) => {
  return await DataModel.aggregate([JoinStage, MatchQuery, projection]);
};

module.exports = ListQueryJoinService;
