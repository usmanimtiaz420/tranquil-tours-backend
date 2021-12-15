/*   -----  Guider  request a quote  to the tourist   --------*/
const mongoose = require("mongoose");
const validator = require("validator");

const requestquoteschema = new mongoose.Schema({
  porposalDescription: {
    type: String,
  },
  price: {
    type: String,
  },
  touristId: {
    type: String,
  },
  guideId: {
    type: String,
  },
  gName: {
    type: String,
  },
  tName: {
    type: String,
  },
});
const requestquote = mongoose.model("Requestquote", requestquoteschema);
module.exports = requestquote;
