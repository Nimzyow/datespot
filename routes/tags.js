const express = require("express");
const router = express.Router();

//@route    api/tags
//@Desc     Get all tags
//@access   Private

router.get("/", (req, res) => {
  res.json({ msg: "Get all tags" });
});

module.exports = router;
