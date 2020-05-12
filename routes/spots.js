const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Spots = require("../models/Spots");

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

// @route   POST api/spots
// @Desc    Add new spots
// @access  Private

router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    location,
    url,
    avg_cost,
    latitude,
    longitude,
    summary,
    address,
    dress,
    best_times,
    advice,
  } = req.body;

  try {
    const newSpot = new Spots({
      title,
      description,
      location,
      url,
      avg_cost,
      latitude,
      longitude,
      summary,
      address,
      dress,
      best_times,
      advice,
    });

    const spot = await newSpot.save();
    res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
