const express = require("express");
const router = express.Router();
const multer = require("multer");
const userAuth = require("../middelware/userAuth");
const adminAuth = require("../middelware/adminAuth");
const category = require("../controllers/category");

const upload = multer({
  fileFilter(req, file, cd) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cd(new Error("Please upload image"));
    }
    cd(null, true);
  },
});

router.post("/category", userAuth, adminAuth, upload.single("image"), category.addCategory);
router.get("/categories", userAuth, category.getCategories);
router.get("/categories/:id", userAuth, category.getCategoryById);
router.get("/categoryCreatedBy/:id", userAuth, category.categoryCreatedBy);
router.patch("/categories/:id", userAuth, adminAuth, upload.single("image"), category.updateCategory);
router.delete("/categories/:id", userAuth, adminAuth, category.deleteCategory);

module.exports = router;
