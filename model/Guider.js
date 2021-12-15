const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const guiderSchema = new mongoose.Schema({
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
  is_guide: {
    type: Boolean,
  },
  is_vGuide: {
    type: Boolean,
  },
  city: {
    type: String,
  },
  bio: {
    type: String,
  },
  price: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],

  // profilePicture:{
  //   type:String

  //    },
  // licenceNumber: {
  //   type: [String],
  //   required: true
  // },
  // tourCharges: {
  //   type: Number,
  //   required: true
  // },
  // gender: {
  //   type: String,
  //   required: true
  // },
  // experience: {
  //   type: Number,
  //   required: true
  // },
  // Bio: {
  //   type: String,
  //   required: true
  // },
  // destination: {
  //   type: String,
  //   required: true
  // },
});
guiderSchema.pre("save", async function (next) {
  const guider = this;
  if (guider.isModified("password")) {
    guider.password = await bcrypt.hash(guider.password, 8);
  }
  next();
});

const Guider = mongoose.model("Guider", guiderSchema);
module.exports = Guider;
