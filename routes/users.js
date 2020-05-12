const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  async (req, res) => {
    //express validator check, gotten from express validator documentation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //destructure req.body
    const { username, email, password } = req.body;

    //checking to see if the user with that email already exists
    try {
      let user = await User.findOne({ email });
      //if exists, throw status(400) error
      if (user) {
        return res
          .status(400)
          .json({ msg: "user with that email already exists" });
      }
      //if validations all pass, create a new instance of User(defined in models/User.js)
      user = new User({
        username,
        email,
        password,
      });

      //we need a salt to indicate the encryption strength. it is 10 by default
      const salt = await bcrypt.genSalt(10);

      //hash the password
      user.password = await bcrypt.hash(password, salt);

      //save to users table
      await user.save();

      //create payload for jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };
      //sign token and return token to user.
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
