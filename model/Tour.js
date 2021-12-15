const mongoose = require("mongoose");
/* -----   plan a tour by the tourist  ----- */
const tourSchema = new mongoose.Schema({
  destination: {
    type: String,
  },
  startdate: {
    type: Number,
  },
  date: {
    type: String,
  },
  enddate: {
    type: Number,
  },
  child: {
    type: Number,
  },
  adult: {
    type: Number,
  },
  language: {
    type: Array,
  },
  accomodation: {
    type: Boolean,
  },
  transportation: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  touristId: {
    type: String,
  },
  touristName: {
    type: String,
  },
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
