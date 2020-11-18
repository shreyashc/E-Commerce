const mongoose = require("mongoose");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const dotenv = require("dotenv").config({ path: __dirname + "../.env" });
const crypto = require("crypto");
console.log(process.env.MONGODB_URI);
const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

let gfs;
conn.once("open", () => {
  //   gfs = GridFsStream(conn.db, mongoose.mongo);
  //   gfs.collection("uploads");
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
});

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: {
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

module.exports = {
  storage,
};
