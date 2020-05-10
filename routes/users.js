const express = require("express");
const router = express.Router();

// @route   POST api/users
// @dec     Register a user
// @access  Public

router.post("/", (req, res) => {
  res.json({ msg: "hello post request register a user" });
});

module.exports = router;
