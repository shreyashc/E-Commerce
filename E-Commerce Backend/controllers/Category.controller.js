const mongoose = require("mongoose");
const createError = require("http-errors");
const Category = require("../models/Category.model");

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      const categories = await Category.find({}).lean();
      res.send(categories);
    } catch (err) {}
  },
  getCategoryById: async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        throw createError(404, "Category not found");
      }
      res.send(category);
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw createError(400, "Bad Request");
      }
    }
  },
  createACategory: async (req, res, next) => {
    try {
      const { title } = req.body;
      const category = new Category({ title });
      const result = await category.save();
      res.send(result);
    } catch (err) {}
  },
  updateACategory: async (req, res, next) => {
    try {
      const { title } = req.body;
      const result = await Category.findByIdAndUpdate(
        req.params.id,
        { title },
        {
          new: true,
        }
      );
      if (!result) {
        throw createError(404, "category not found");
      }
      res.send(result);
    } catch (err) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Bad request"));
      }

      next(error);
    }
  },
  deleteACategory: async (req, res, next) => {
    try {
      let category = await Category.findById(req.params.id);

      if (!category) {
        throw createError(404, "Category not found");
      }
      const result = await Category.deleteOne(category);
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