const express = require("express");
const router = express.Router();
const multer = require("multer");
const userAuth = require("../middelware/userAuth");
const adminAuth = require("../middelware/adminAuth");
const subCategory = require("../controllers/subCategory");

const upload = multer({
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif|avif)$/)) {
      return cd(new Error("Please upload image"));
    }
    cd(null, true);
  },
});

router.post(
  "/subCategory",
  userAuth,
  adminAuth,
  upload.single("image"),
  subCategory.addSubCategory
);

router.get(
  "/subCategories",
  userAuth,
  subCategory.getSubCategories
);

router.get(
  "/subCategoriesCategory/:id",
  userAuth,
  subCategory.getSubCategoriesByCategoryId
);

router.get("/subCategories/:id", userAuth, subCategory.getSubCategoryById);

router.get(
  "/subCategoryCreatedBy/:id",
  userAuth,
  subCategory.subCategoryCreatedBy
);

router.get(
  "/categoryOfSubCategory/:id",
  userAuth,
  subCategory.categoryOfSubCategory
);

router.patch(
  "/subCategories/:id",
  userAuth,
  adminAuth,
  upload.single("image"),
  subCategory.updateSubCategory
);
router.delete(
  "/subCategories/:id",
  userAuth,
  adminAuth,
  subCategory.deleteSubCategory
);

module.exports = router;
