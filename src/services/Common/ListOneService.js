const { ObjectId } = require("mongoose").Types;

const ListOneService = async (Request, DataModel) => {
  try {
    const data = await DataModel.aggregate([{ $project: { name: 0 } }]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: "Sorry, Something went wrong" };
  }
};

module.exports = ListOneService;
