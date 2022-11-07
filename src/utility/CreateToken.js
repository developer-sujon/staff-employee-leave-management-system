//External Lib Import
const jwt = require("jsonwebtoken");

const CreateToken = async (payLoad) => {
  return await jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: "7 days",
  });
};

module.exports = CreateToken;
