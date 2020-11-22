const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const RefreshToken = require("../models/RefreshToken.model");
module.exports = {
  generateAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACC_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "hcecommerce.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (error) {
          console.log(error.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authorizationHeader = req.headers["authorization"];
    const bearerToken = authorizationHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACC_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  verifyRefreshToken: (token) => {
    return new Promise((reslove, reject) => {
      JWT.verify(token, process.env.REF_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;
        RefreshToken.findOne({ userId });
      });
    });
  },
};
