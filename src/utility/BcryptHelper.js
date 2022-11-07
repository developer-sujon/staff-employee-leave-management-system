//External Lib Import
const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const VerifyPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = {
  HashPassword,
  VerifyPassword,
};
