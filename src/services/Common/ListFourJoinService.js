const ListFourJoinService = async (
  Request,
  DataModel,
  SearchArray,
  JoinStageOne,
  JoinStageTwo,
  JoinStageThree,
  JoinStageFour,
  projection,
) => {
  const searchKeyword = Request.params.searchKeyword;
  const pageNumber = +Request.params.pageNumber;
  const perPage = +Request.params.perPage;

  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== "0") {
    return await DataModel.aggregate([
      JoinStageOne,
      JoinStageTwo,
      JoinStageThree,
      JoinStageFour,
      {
        $match: { $or: SearchArray },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $skip: skipRow },
            { $sort: { _id: -1 } },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  } else {
    return await DataModel.aggregate([
      JoinStageOne,
      JoinStageTwo,
      JoinStageThree,
      JoinStageFour,
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $skip: skipRow },
            { $sort: { _id: -1 } },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  }
};

module.exports = ListFourJoinService;
