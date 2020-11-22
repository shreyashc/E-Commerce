const mongoose = require("mongoose");
const createError = require("http-errors");
const Product = require("../models/Product.model");
const fs = require("fs");
const path = require("path");

module.exports = {
  /**
   * get all product
   */
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.find({}).lean();
      res.send(products);
    } catch (err) {
      console.log(err.message);
    }
  },
  getProductById: async (req, res, next) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw createError(404, "product not found");
      }
      res.send(product);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw createError(400, "Bad Request");
      }
    }
  },
  /**
   * create a product
   */
  createAProduct: async (req, res, next) => {
    const {
      title,
      short_desc,
      description,
      price,
      inStock,
      categories,
    } = req.body;
    let image_buffer;
    if (req.file) {
      image_buffer = fs.readFileSync(
        path.join(__dirname + "/../uploads/" + req.file.filename)
      );
    }
    const product = new Product({
      title,
      short_desc,
      description,
      price,
      inStock,
      categories,
      image: {
        data: image_buffer || null,
        contentType: req.file ? req.file.mimetype : null,
      },
    });
    const result = await product.save();
    res.send(result);
  },

  /**
   * update a product
   */

  updateAProduct: async (req, res, next) => {
    const productId = req.params.id;
    try {
      let update = req.body;
      let image;
      if (req.file) {
        const image_buffer = fs.readFileSync(
          path.join(__dirname + "/../uploads/" + req.file.filename)
        );
        image = {
          data: image_buffer || null,
          contentType: req.file ? req.file.mimetype : null,
        };
        update.image = image;
      }
      const result = await Product.findByIdAndUpdate(productId, update, {
        new: true,
      });
      if (!result) {
        throw createError(404, "product not found");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Bad request"));
      }

      next(error);
    }
  },
  /**
   * delete a product
   */
  deleteAProduct: async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        throw createError(404, "product not found");
      }
      const result = await Product.deleteOne(product);
      res.send(result);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Bad Request"));
        return;
      }
      next(error);
    }
  },
};
