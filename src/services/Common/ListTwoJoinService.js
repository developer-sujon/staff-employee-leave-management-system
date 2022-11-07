const ListTwoJoinService = async (
  Request,
  DataModel,
  SearchArray,
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
        $match: { $or: SearchArray },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }, projection],
        },
      },
    ]);
  } else {
    return await DataModel.aggregate([
      JoinStageOne,
      JoinStageTwo,
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [{ $skip: skipRow }, { $limit: perPage }, projection],
        },
      },
    ]);
  }
};

module.exports = ListTwoJoinService;
