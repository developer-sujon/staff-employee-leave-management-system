const LeaveListService = async (
  Request,
  DataModel,
  SearchArray,
  MatchQuery,
  JoinStageOne,
  JoinStageTwo,
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
      {
        $match: MatchQuery,
      },
      {
        $match: { $or: SearchArray },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
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
      {
        $match: MatchQuery,
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  }
};

module.exports = LeaveListService;
