const jwt = require("jsonwebtoken");
const config = require("config");

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
  generateToken,
};
