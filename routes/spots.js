/* eslint-disable consistent-return */
const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Spots = require("../models/Spot");

// @route   POST api/spots
// @Desc    Add new spots
// @access  Private

router.post("/", [auth, [
  check("title", "Please enter a title").notEmpty(),
  check("description", "Please enter a description").notEmpty(),
  check("url", "Please enter a url to an image").isURL(),
  check("avgCost", "Please enter an average cost").exists(),
  check("summary", "Please enter a summary").notEmpty(),
  check("address", "Please enter an address").notEmpty(),
  check("advice", "Please enter an advice for this spot").notEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newSpot = new Spots({
      ...req.body,
    });

    const spot = await newSpot.save();
    return res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/spots
// @Desc    Get all spots
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const spots = await Spots.find();
    res.json(spots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/spots/:id
// @Desc    Update spots
// @access  Private

router.patch("/:id", auth, async (req, res) => {
  const spotFields = { ...req.body };
  try {
    let spot = await Spots.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Contact not found" });
    if (spot && req.body.comments) {
      spotFields.comments = [...spot.comments, req.body.comments];
    }
    if (spot && req.body.tags) {
      spotFields.tags = [...spot.tags, req.body.tags];
    }
    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: spotFields,
      },
      { new: true },
    );
    return res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Spots.findByIdAndRemove(req.params.id);
    return res.status(200).json({ msg: "Deleted spot successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
