const FilterLeaveByStatusAdminService = async (Request, DataModel) => {
  const data = DataModel.aggregate([
    { $match: { AdminStatus: Request.params.status } },
  ]);
  return data;
};

module.exports = FilterLeaveByStatusAdminService;
