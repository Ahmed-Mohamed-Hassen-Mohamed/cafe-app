const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: "3",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      let regExp = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
      );
      if (!regExp.test(value)) {
        throw new Error("Password must include (a-z) && (A-Z) && (0-9)");
      }
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  roles: {
    type: Number,
    enum: [0, 1, 2, 3],
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Please check username or password");
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Please check username or password");
  }
  return user;
};

userSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id.toString(),
    roles: this.roles,
  };
  if (this.roles == 0 || this.roles == 1) {
    const token = jwt.sign(payload, process.env.API_KEY);
    return token;
  } else if (this.roles == 3) {
    const token = jwt.sign(payload, process.env.API_KEY, {
      expiresIn: process.env.TIME_OFFICEBOY,
    });
    return token;
  }
  const token = jwt.sign(payload, process.env.API_KEY, {
    expiresIn: process.env.TIME_EMPLOYEE,
  });
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
