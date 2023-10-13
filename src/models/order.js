const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SubCategory",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
