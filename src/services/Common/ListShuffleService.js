const ShuffleArray = require("../../utility/ShuffleArray");
const ListShuffleService = async (DataModel, MatchQuery) => {
  try {
    let data = await DataModel.aggregate([{ $match: MatchQuery }]);
    return { status: "success", data: ShuffleArray(data) };
  } catch (error) {
    return { status: "fail", data: "Sorry, Something went wrong" };
  }
};
module.exports = ListShuffleService;
