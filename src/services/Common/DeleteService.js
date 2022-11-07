//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const DeleteService = async (Request, DataModel) => {
  const DeleteID = Request.params.id;

  const QueryObject = {};
  QueryObject._id = DeleteID;

  return await DataModel.deleteMany(QueryObject);
};

module.exports = DeleteService;
