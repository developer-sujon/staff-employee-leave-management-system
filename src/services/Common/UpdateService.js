//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//Internal Lib Import
const { CreateError } = require("../../helper/ErrorHandler");

const UpdateService = async (Request, DataModel) => {
  const UpdateID = Request.params.id;
  const PostBody = Request.body;

  return DataModel.updateOne({ _id: UpdateID }, PostBody, {
    new: true,
  });
};

module.exports = UpdateService;
