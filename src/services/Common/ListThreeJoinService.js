const ListTwoJoinService = async (
  Request,
  DataModel,
  SearchArray,
  JoinStageOne,
  JoinStageTwo,
  JoinStageThree,
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

module.exports = ListTwoJoinService;
