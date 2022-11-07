const DropDownService = async (Request, DataModel, MatchQuery, Projection) => {
  const data = DataModel.aggregate([
    { $match: MatchQuery },
    { $project: Projection },
  ]);
  return data;
};

module.exports = DropDownService;
