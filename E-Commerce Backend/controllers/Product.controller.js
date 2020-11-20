const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const gfs = require("../helpers/ImageStorage");
var fs = require("fs");
var path = require("path");
module.exports = {
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
        res.status(400).send();
      }
      res.send(product);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        res.status(400).send();
        return;
      }
    }
  },
  createAProduct: async (req, res, next) => {
    const {
      title,
      short_desc,
      description,
      price,
      inStock,
      categories,
    } = req.body;
    const image_buffer = fs.readFileSync(
      path.join(__dirname + "/../uploads/" + req.file.filename)
    );
    const product = new Product({
      title,
      short_desc,
      description,
      price,
      inStock,
      categories,
      image: {
        data: image_buffer,
        contentType: req.file.mimetype,
      },
    });
    const result = await product.save();
    res.send(result);
  },
  updateAProduct: async (req, res, next) => {
    try {
    } catch (error) {}
  },
  deleteAProduct: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};
