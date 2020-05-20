const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const createDBUser = async (user) => {
  const userToSave = user || {
    username: "defaulty",
    email: "defaultEmail@default.com",
    password: "defaultPassword",
  };

  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(userToSave.password, salt);

  const userCreated = new User({
    ...userToSave,
  });

  const userSaved = await userCreated.save();

  return userSaved;
};

module.exports = {
  createDBUser,
};
