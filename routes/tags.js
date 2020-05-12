const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Tags = require("../models/Tag");

//@route    api/tags
//@Desc     Get all tags
//@access   Private

router.get("/", auth, async (req, res) => {
  try {
    const tags = await Tags.find();
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    api/tags
//@Desc     Add new tag
//@access   Private

router.post("/", auth, async (req, res) => {
  const { tag } = req.body;

  try {
    const newTag = new Tags({
      tag,
    });

    const tagSave = await newTag.save();
    res.json(tagSave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
