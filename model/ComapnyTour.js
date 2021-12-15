const mongoose = require("mongoose");
/* -----   plan a tour by the tourist  ----- */
const CompanytourSchema = new mongoose.Schema({
  destination: {
    type: String,
  },
  startdate: {
    type: Number,
  },
  enddate: {
    type: Number,
  },

  description: {
    type: String,
  },
  costPerPerson: {
    type: String,
  },
  companyId: {
    type: String,
  },
});

const CompanyTour = mongoose.model("ComapnyTour", CompanytourSchema);
module.exports = CompanyTour;
