const express = require("express");
const router = express.Router();

// @route   GET api/spots
// @Desc    Get Logged in user
// @access  Private

router.get("/", (req, res) => {
  res.json({ msg: "hello get request from user" });
});

module.exports = router;
