const express = require("express");
const router = express.Router();
const CartController = require("../controllers/Cart.controller");

router.get("/products", CartController.getProductsInCart);

router.post("/addProduct", CartController.addProductToCart);

router.delete("/removeProduct", CartController.removeProductFromCart);

module.exports = router;
