const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  guiderID: {
    type: String,
  },
  touristId: {
    type: String,
  },
  // tour: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Tour',
  //   required: [true, 'Review must belong to a tour.']
  // },
  // tourist: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Tourist',
  //   required: [true, 'Review must belong to a user']
  // }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
