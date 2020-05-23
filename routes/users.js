const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const { generateHashPassword } = require("../passwordUtils");
const { generateToken } = require("../tokenUtils");
const User = require("../models/User");

// @route   POST api/users
// @dec     Register a user
// @access  Public

router.post(
  "/",
  [
    check("username", "Please add a username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").isLength({ min: 6 }),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // if exists, throw status(401) error
      if (user) {
        return res
          .status(401)
          .json({ msg: "user with that email already exists" });
      }

      user = new User({
        username,
        email,
        password,
      });

      user.password = await generateHashPassword(password);

      await user.save();
      try {
        const token = await generateToken(user.id);
        return res.status(200).json({ token });
      } catch (err) {
        console.error(err);
        res.statusCode(501).json({ msg: "Token generation failed" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  },
);

module.exports = router;
