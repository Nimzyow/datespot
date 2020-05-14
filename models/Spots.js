const mongoose = require("mongoose");

const SpotSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    avg_cost: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    summary: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dress: {
      type: String,
      required: true,
    },
    best_times: {
      type: String,
    },
    advice: {
      type: String,
      required: true,
    },
    tags: [
      {type: mongoose.Schema.Types.ObjectId, ref: "tags"}
    ]
    //tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("spot", SpotSchema);
