//External Lib Import
const jwt = require("jsonwebtoken");

const DecodedToken = async (Token) => {
  return await jwt.verify(Token, process.env.JWT_SECRET_KEY);
};

module.exports = DecodedToken;
