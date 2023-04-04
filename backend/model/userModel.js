const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const dotenv = require("dotenv");

// dotenv.config({ path: "backend/config/config.env" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name."],
    maxLength: [30, "Name should be less then 30 Charector."],
    minLength: [4, "Name should be greater than 4 Charector."],
  },

  email: {
    unique: true,
    type: String,
    required: [true, "Please Enter Your Email."],
    validator: [validator.isEmail, "Please Enter a valid Email."],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password."],
    minLength: [8, "Password should be Greater then 8 charector."],
    select: false, //This help to disSelect the password data when some admin tries to find() all the data of user.
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//BCRYPTJS //This is ued when register
//arrow function is not working here
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  //register case and modified case
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Generate token using jwt.sign()
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generate token using crypto.randomBytes()
userSchema.methods.getResetpasswordToken = function () {
  // const buffer = crypto.randomBytes(20);
  // const gvalue = crypto.randomBytes(20).toString();
  const resetToeken = crypto.randomBytes(20).toString("hex");
  console.log(resetToeken);
};

module.exports = mongoose.model("User", userSchema);
