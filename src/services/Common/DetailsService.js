//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

const DetailsService = async (Request, DataModel) => {
  const DetailsID = Request.params.id;

  const data = await DataModel.aggregate([
    {
      $match: {
        $and: [{ _id: ObjectId(DetailsID) }],
      },
    },
  ]);

  return data;
};

module.exports = DetailsService;
