const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv").config();
const app = express();

require("./db/connectMongo")();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { storage } = require("./helpers/ImageStorage");
const upload = multer({ storage });

app.post("/", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.listen(
  process.env.PORT || 1337,
  console.log("E-commerce server up on PORT:" + process.env.PORT || 1337)
);
