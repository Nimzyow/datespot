const express = require("express");

const auth = require("../middleware/auth");

const router = express.Router();

const Spots = require("../models/Spot");

// route  /api/spots/:id/comment
// desc   adds a comment to a spot
// access Private

router.post("/:id/comments", auth, async (req, res) => {
  try {
    let spot = await Spots.findById(req.params.id);

    if (!spot) {
      return res.status(400).json({ msg: "Spot does not exist" });
    }

    const commentToSave = {
      comment: req.body.comment,
      userId: req.user.id,
    };

    const allComments = {
      comments: [...spot.comments, commentToSave],
    };

    spot = await Spots.findByIdAndUpdate(
      req.params.id,
      {
        $set: allComments,
      },
      { new: true },
    );
    return res.status(200).json({ spot, msg: "Comment added to spot" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
