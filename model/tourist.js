const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const touristSchema = new mongoose.Schema({
  firstname: {
    type: String,

    trim: true,
  },
  lastname: {
    type: String,

    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,

    minlength: 7,
    trim: true,
  },
  city: {
    type: String,
  },
  bio: {
    type: String,
  },

  // phoneNumber: {
  //   type: Number,
  //   required: true
  // },
  //

  is_tourist: {
    type: Boolean,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  // guiders: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Guider'
  // }
});

//hashing the password
touristSchema.pre("save", async function (next) {
  const Tourist = this;
  if (Tourist.isModified("password")) {
    Tourist.password = await bcrypt.hash(Tourist.password, 8);
  }
  next();
});
const Tourist = mongoose.model("Tourist", touristSchema);
module.exports = Tourist;
