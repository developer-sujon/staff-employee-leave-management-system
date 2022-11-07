const FilterLeaveByStatusHodService = async (Request, DataModel) => {
  const data = DataModel.aggregate([
    { $match: { HodStatus: Request.params.status } },
  ]);
  return data;
};

module.exports = FilterLeaveByStatusHodService;
