const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

const Spots = require("../models/Spot");

// @route   POST api/spots/like/:id
// @Desc    Add new like to spots
// @access  Private

router.post("/:id/like", auth, async (req, res) => {
  try {
    let spot = await Spots.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Spot not found" });

    const likeFields = {
      likes: [...spot.likes, req.body],
    };

    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: likeFields,
      },
      { new: true },
    );
    return res.status(200).json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/:id/likeRemove", auth, async (req, res) => {
  try {
    let spot = await Spots.findById(req.params.id);
    if (!spot) return res.status(404).json({ msg: "Spot not found" });

    const likesByUserId = spot.likes.map((like) => like.userId);

    if (!likesByUserId.includes(req.user.id)) {
      return res.json({ msg: "Can't unlike something you haven't liked" });
    }

    const filteredLikes = spot.likes.filter(
      (like) => like.userId.toString() !== req.user.id,
    );

    const likeFields = {
      likes: filteredLikes,
    };

    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: likeFields,
      },
      { new: true },
    );
    return res.status(200).json(spot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
