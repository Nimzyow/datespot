const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

const createDBUser = async (user) => {
  const userToSave = user || {
    username: "defaulty",
    email: "defaultEmail@default.com",
    password: "defaultPassword",
  };
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(userToSave.password, salt);
    const userCreated = new User({
      ...userToSave,
      password: passwordEncrypted,
    });
    const userSaved = await userCreated.save();

    return userSaved;
  } catch (err) {
    console.error(err);
  }
};

const generateToken = (id) => new Promise((resolve, reject) => {
  const payload = {
    user: {
      id,
    },
  };

  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) { reject(err); }
      resolve(token);
    },
  );
});

module.exports = {
  createDBUser,
  generateToken,
};
