const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/ImageStorage");
const ProductController = require("../controllers/Product.controller");
//@route /products

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", upload.single("image"), ProductController.createAProduct);
router.patch("/:id", ProductController.updateAProduct);
router.delete("/:id", ProductController.deleteAProduct);

module.exports = router;
