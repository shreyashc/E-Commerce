const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/ImageStorage");
const CategoryController = require("../controllers/Category.controller");

//@route /categories

router.get("/", CategoryController.getAllCategory);

router.get("/:id", CategoryController.getCategoryById);

router.post("/", upload.single("image"), CategoryController.createACategory);

router.patch(
  "/:id",
  upload.single("image"),
  CategoryController.updateACategory
);

router.delete("/:id", CategoryController.deleteACategory);

module.exports = router;
