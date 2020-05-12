const express = require("express");
const router = express.Router();
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @Desc    Get Logged in user
// @access  Private

router.get(
  "/",
  [
    check("username", "Please add a username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    res.json({ msg: "get request in auth" });
  }
);

// @route   POST api/auth
// @dec     Auth user and get token
// @access  Public

router.post("/", (req, res) => {
  res.json({ msg: "post request in auth" });
});

module.exports = router;
