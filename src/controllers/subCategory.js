const SubCategory = require("../models/subCategory");

// Example controller functions

exports.addSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategory({ ...req.body, owner: req.user._id });
    subCategory.image = req.file.buffer;
    await subCategory.save();
    res.status(200).send(subCategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({})
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "owner", select: "username" });
    if (!subCategories.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "No subCategories is found" });
    }
    res.status(200).send(subCategories);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const subCategory = await SubCategory.findById(_id)
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "owner", select: "username" });
    if (!subCategory) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This subCategory is not found" });
    }
    res.status(200).send(subCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.subCategoryCreatedBy = async (req, res) => {
  try {
    const _id = req.params.id;
    const subCategory = await SubCategory.findById(_id).populate("owner");
    if (!subCategory) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This subCategory is not found" });
    }
    res.status(200).send(subCategory.owner);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.categoryOfSubCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const subCategory = await SubCategory.findById(_id).populate("categoryId");
    if (!subCategory) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This subCategory is not found" });
    }
    res.status(200).send(subCategory.categoryId);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateSubCategory = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const _id = req.params.id;
    const subCategory = await SubCategory.findById(_id);
    if (!subCategory) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This subCategory is not found" });
    }
    subCategory.owner = req.user._id;
    updates.forEach((key) => {
      subCategory[key] = req.body[key];
    });
    if (req.file) {
      subCategory.image = req.file.buffer;
    }
    await subCategory
      .save()
      .populate({ path: "categoryId", select: "name" })
      .populate({ path: "owner", select: "username" });
    res.status(200).send(subCategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const subCategory = await SubCategory.findByIdAndDelete(_id);
    if (!subCategory) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This subCategory is not found" });
    }
    res.status(200).send(subCategory);
  } catch (err) {
    res.status(500).send(err);
  }
};
