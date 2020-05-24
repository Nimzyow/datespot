const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const { compare } = require("../passwordUtils");
const { generateToken } = require("../tokenUtils");
const User = require("../models/User");

// @route   GET api/auth
// @Desc    Get Logged in user
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @dec     Auth user and get token
// @access  Public

router.post(
  "/",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: "email and password do not match" });
      }
      try {
        const token = await generateToken(user.id);
        return res.status(200).json({ token });
      } catch (err) {
        console.error(err);
        return res.statusCode(501).json({ msg: "Token generation failed" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  },
);

module.exports = router;
