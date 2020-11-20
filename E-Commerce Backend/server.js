const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv").config();
const app = express();

require("./db/connectMongo")();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const productRoutes = require("./routes/product.routes");

app.use("/product", productRoutes);
app.listen(
  process.env.PORT || 1337,
  console.log("E-commerce server up on PORT:" + process.env.PORT || 1337)
);
