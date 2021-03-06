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
    },
    url: {
      type: String,
      required: true,
    },
    avgCost: {
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
    },
    bestTimes: {
      type: String,
    },
    advice: {
      type: String,
      required: true,
    },
    tags: [
      { type: String },
    ],
    comments: [
      { comment: { type: String }, date: { type: Date, default: Date.now }, userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
    ],
    likes: [
      { date: { type: Date, default: Date.now }, userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("spot", SpotSchema);
