const express = require("express");
const router = express.Router();
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   GET api/auth
// @Desc    Get Logged in user
// @access  Private

router.get("/", (req, res) => {
  res.json({ msg: "get request in auth" });
});

// @route   POST api/auth
// @dec     Auth user and get token
// @access  Public

router.post("/", (req, res) => {
  res.json({ msg: "post request in auth" });
});

module.exports = router;
