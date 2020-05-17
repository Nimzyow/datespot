/* eslint-disable consistent-return */
const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const Spots = require("../models/Spot");

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

router.put("/:id", auth, async (req, res) => {
  const {
    title,
    description,
    location,
    url,
    avgCost,
    latitude,
    longitude,
    summary,
    address,
    dress,
    bestTimes,
    advice,
    tags,
    comments,
  } = req.body;

  const spotFields = {};

  if (title) spotFields.title = title;
  if (description) spotFields.description = description;
  if (location) spotFields.location = location;
  if (url) spotFields.url = url;
  if (avgCost) spotFields.avgCost = avgCost;
  if (latitude) spotFields.latitude = latitude;
  if (longitude) spotFields.longitude = longitude;
  if (summary) spotFields.summary = summary;
  if (address) spotFields.address = address;
  if (dress) spotFields.dress = dress;
  if (bestTimes) spotFields.bestTimes = bestTimes;
  if (advice) spotFields.advice = advice;
  if (tags) spotFields.tags = tags;
  if (comments) spotFields.comments = comments;
  try {
    let spot = await Spots.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Contact not found" });
    if (spot && comments) {
      spotFields.comments = [...spot.comments, comments];
    }
    if (spot && tags) {
      spotFields.tags = [...spot.tags, tags];
    }
    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: spotFields,
      },
      { new: true },
    );
    res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/spots/like/:id
// @Desc    Add new like to spots
// @access  Private

router.put("/like/:id", auth, async (req, res) => {
  const {
    like,
  } = req.body;

  const likeFields = {};

  if (like) likeFields.like = like;
  try {
    let spot = await Spots.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Contact not found" });

    if (spot && like) {
      likeFields.likes = [...spot.likes, like];
    }
    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: likeFields,
      },
      { new: true },
    );
    res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
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
    avgCost,
    latitude,
    longitude,
    summary,
    address,
    dress,
    bestTimes,
    advice,
    comments,
  } = req.body;

  try {
    const newSpot = new Spots({
      title,
      description,
      location,
      url,
      avgCost,
      latitude,
      longitude,
      summary,
      address,
      dress,
      bestTimes,
      advice,
      comments,
    });

    const spot = await newSpot.save();
    res.json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
