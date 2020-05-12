const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @Desc    Get Logged in user
// @access  Private

router.get("/", async (req, res) => {});

// @route   POST api/auth
// @dec     Auth user and get token
// @access  Public

router.post("/", (req, res) => {
  res.json({ msg: "post request in auth" });
});

module.exports = router;
