const Category = require("../models/category");

// Example controller functions

exports.addCategory = async (req, res) => {
  try {
    const category = new Category({ ...req.body, owner: req.user._id });
    category.image = req.file.buffer;
    await category.save();
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate({
      path: "owner",
      select: "username",
    });
    if (!categories.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "No categories is found" });
    }
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findById(_id).populate({
      path: "owner",
      select: "username",
    });
    if (!category) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This category is not found" });
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.categoryCreatedBy = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findById(_id).populate({
      path: "owner",
      select: "username",
    });
    if (!category) {
      return res.status(404).send({ Error: "Not found", message: "This category is not found" });
    }
    res.status(200).send(category.owner);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateCategory = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const _id = req.params.id;
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).send({ Error: "Not found", message: "This category is not found" });
    }
    category.owner = req.user._id;
    updates.forEach((key) => {
      category[key] = req.body[key];
    });
    if (req.file) {
      category.image = req.file.buffer;
    }
    await category.save().populate({
      path: "owner",
      select: "username",
    });
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndDelete(_id);
    if (!category) {
      return res.status(404).send({ Error: "Not found", message: "This category is not found" });
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
};
