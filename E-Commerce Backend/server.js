const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const app = express();

require("./db/connectMongo")();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(
  process.env.PORT || 1337,
  console.log("E-commerce server up on PORT:" + process.env.PORT || 1337)
);
