const express = require("express");
const router = express.Router();

//@route /products

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createAProduct);
router.patch("/:id", ProductController.updateAProduct);
router.delete("/:id", ProductController.deleteAProduct);

module.exports = router;
