const Order = require("../models/order");

// Example controller functions

exports.addOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, owner: req.user._id });
    await order.save();
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const orders = await Order.find({ status })
      .populate("subCategoryId")
      .populate("owner");
    if (!orders.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "No orders is found" });
    }
    for (let order of orders) {
      await order.owner.populate("roomId");
    }
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findById(_id)
      .populate("subCategoryId")
      .populate("owner");
    if (!order) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This order is not found" });
    }
    await order.owner.populate("roomId");
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.orderSubCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findById(_id).populate("subCategoryId");
    if (!order) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This order is not found" });
    }
    res.status(200).send(order.subCategoryId);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findByIdAndUpdate(_id, req.body, { new: true })
      .populate("subCategoryId")
      .populate("owner");
    if (!order) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This order is not found" });
    }
    await order.owner.populate("roomId");
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await Order.findByIdAndDelete(_id);
    if (!order) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This order is not found" });
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.dashboard = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("subCategoryId")
      .populate("owner");
    if (!orders.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "No orders is found" });
    }
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};
