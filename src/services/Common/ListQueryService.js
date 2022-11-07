const ListQueryService = async (Request, DataModel, Query) => {
  return await DataModel.aggregate([
    {
      $match: Query,
    },
    { $project: { Password: 0 } },
  ]);
};

module.exports = ListQueryService;
