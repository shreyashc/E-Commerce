const Cart = require("../models/Cart.model");
const createError = require("http-errors");
module.exports = {
  getProductsInCart: async (req, res, next) => {
    try {
      const { userId } = req.body;
      let userCart = await Cart.findOne({ user: userId }).populate({
        path: "products.productId",
        model: "product",
      });
      res.send(userCart);
    } catch (error) {
      next(error);
    }
  },
  addProductToCart: async (req, res, next) => {
    try {
      const { productId, quantity, userId } = req.body;
      let userCart = await Cart.findOne({ user: userId });

      //user has a cart
      if (userCart) {
        //check if the product already exists
        let productIndex = userCart.products.findIndex(
          (p) => p.productId == productId
        );

        //product is present in the cart
        // so incr quantity
        if (productIndex > -1) {
          let product = userCart.products[productIndex];
          product.quantity += 1;
          userCart.products[productIndex] = product;
        } else {
          //product not found in the cart // so add one
          userCart.products.push({ productId, quantity: 1 });
        }
        userCart = await userCart.save({ new: true });
        res.status(201).send(userCart);
      } else {
        //user don't have a cart //so create new cart
        const newCart = await Cart.create({
          user: userId,
          products: [{ productId, quantity: 1 }],
        });
        res.status(201).send(newCart);
      }
    } catch (error) {
      next(error);
    }
  },
  removeProductFromCart: async (req, res, next) => {
    try {
      const { userId, productId, quantity } = req.body;
      const userCart = await Cart.findOne({ user: userId });
      if (!userCart) throw createError.NotFound();
      let productIndex = userCart.products.findIndex(
        (p) => p.productId == productId
      );
      if (productIndex > -1) {
        let product = userCart.products[productIndex];
        //decr quantity
        product.quantity -= quantity;
        //quantity < 0  delete it
        if (product.quantity <= 0) {
          userCart.products.splice(productIndex, 1);
          let updatedCart = await userCart.save({ new: true });
          return res.status(200).send(updatedCart);
        }
        //else update
        userCart.products[productIndex] = product;
        let updatedCart = await userCart.save({ new: true });
        res.status(200).send(updatedCart);
      } else {
        throw createError.NotFound();
      }
    } catch (error) {
      next(error);
    }
  },
};
