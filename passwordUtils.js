const bcrypt = require("bcryptjs");

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  return passwordEncrypted;
};

const compare = async (reqPassword, userPassword) => {
  const isMatch = await bcrypt.compare(reqPassword, userPassword);
  return isMatch;
};

module.exports = {
  generateHashPassword,
  compare,
};
