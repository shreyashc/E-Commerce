const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/Category.controller");

//@route /categories

router.get("/", CategoryController.getAllCategory);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.createACategory);
router.patch("/:id", CategoryController.updateACategory);
router.delete("/:id", CategoryController.deleteACategory);

module.exports = router;
