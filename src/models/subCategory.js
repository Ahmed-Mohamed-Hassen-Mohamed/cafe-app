const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

subCategorySchema.methods.toJSON = function () {
  const imageObject = this.toObject();
  return imageObject;
};

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
