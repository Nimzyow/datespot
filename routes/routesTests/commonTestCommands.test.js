const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Spot = require("../../models/Spot");

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

const createSpot = async (spot) => {
  const spotToSave = spot || {
    title: "a default title",
    description: "a default description",
    url: "www.google.com",
    avgCost: "30",
    summary: "A default summary",
    address: "A default address",
    advice: "A default advice",
  };
  try {
    const spotCreated = new Spot({
      ...spotToSave,
    });

    const spotSaved = await spotCreated.save();

    return spotSaved;
  } catch (err) {
    console.log(err);
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
    process.env.datespotJwtSecret,
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
  createSpot,
};
