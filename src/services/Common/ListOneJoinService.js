const ListOneJoinService = async (
  Request,
  DataModel,
  SearchArray,
  JoinStage,
  projection,
) => {
  const searchKeyword = Request.params.searchKeyword;
  const pageNumber = +Request.params.pageNumber;
  const perPage = +Request.params.perPage;

  const skipRow = (pageNumber - 1) * perPage;
  let data;

  if (searchKeyword !== "0") {
    data = await DataModel.aggregate([
      JoinStage,
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

    return data;
  } else {
    data = await DataModel.aggregate([
      JoinStage,
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
    return data;
  }
};

module.exports = ListOneJoinService;
