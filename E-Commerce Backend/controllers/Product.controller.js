const mongoose = require("mongoose");
const Product = require("../models/Product.model");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const polls = await Product.find({}).populate("owner", "username").lean();
      res.send(polls);
    } catch (err) {
      console.log(err.message);
    }
  },
  getProductById: async (req, res, next) => {},
  createAProduct: async (req, res, next) => {},
  updateAProduct: async (req, res, next) => {},
  deleteAProduct: async (req, res, next) => {},
};
