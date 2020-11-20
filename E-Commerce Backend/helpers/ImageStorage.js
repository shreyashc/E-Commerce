const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });
module.exports = {
  upload,
};
