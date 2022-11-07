const EmployeeListService = async (Request, DataModel, SearchArray) => {
  const EmployeeId = Request.EmployeeId;
  const searchKeyword = Request.params.searchKeyword;
  const pageNumber = +Request.params.pageNumber;
  const perPage = +Request.params.perPage;

  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== "0") {
    return await DataModel.aggregate([
      {
        $match: { $or: [{ Roles: "HOD" }, { Roles: "STAFF" }] },
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
          ],
        },
      },
    ]);
  } else {
    return await DataModel.aggregate([
      {
        $match: { $or: [{ Roles: "HOD" }, { Roles: "STAFF" }] },
      },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
            { $limit: perPage },
          ],
        },
      },
    ]);
  }
};

module.exports = EmployeeListService;
