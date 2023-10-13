const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

categorySchema.methods.toJSON = function () {
  const imageObject = this.toObject();
  return imageObject;
};

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
