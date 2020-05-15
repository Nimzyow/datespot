/* eslint-disable consistent-return */
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const Tags = require("../models/Tag");

// @route    api/tags
// @Desc     Get all tags
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const tags = await Tags.find();
    res.json(tags);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    api/tags/:id
// @Desc     Get all spots associated with tag
// @access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    Tags.findById(req.params.id).populate("spots")
      .exec((err, spots) => {
        if (err) {
          return res.status(400)
            .json({ msg: "bad request" });
        }
        res.json(spots);
      });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    api/tags
// @Desc     Add new tag
// @access   Private

router.post("/", auth, async (req, res) => {
  const { tag, spotId } = req.body;

  try {
    const newTag = new Tags({
      tag,
      spots: [spotId],
    });

    const tagSave = await newTag.save();
    res.json(tagSave);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
