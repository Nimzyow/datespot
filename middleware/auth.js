const tokenUtiles = require("../tokenUtils");

module.exports = async (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }
  try {
    const decoded = await tokenUtiles.verify(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
