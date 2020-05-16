const mongoose = require("mongoose");

const TagSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
    },
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: "spot" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("tag", TagSchema);
