const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const RefreshToken = require("../models/RefreshToken.model");
const dotenv = require("dotenv").config({ path: __dirname + "../.env" });

//TODO: check refresh tokens expiry and delete them before gen new one.

module.exports = {
  generateAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: user.id,
        role: user.role,
      };
      const secret = process.env.ACC_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "hcecommerce.com",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, _res, next) => {
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

  generateRefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: user.id,
        role: user.role,
      };
      const secret = process.env.REF_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "shreyashc.com",
      };
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
        }

        //delete old one
        await RefreshToken.findOneAndDelete({ user: user.id });

        const dbRefresh = new RefreshToken({
          user: user.id,
          token: token,
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        await dbRefresh.save();
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (token) => {
    return new Promise((reslove, reject) => {
      JWT.verify(token, process.env.REF_TOKEN_SECRET, async (err, payload) => {
        if (err) return reject(createError.Unauthorized());

        const userId = payload.userId;
        const rToken = await RefreshToken.findOne({ user: userId });

        if (rToken) {
          if (token === rToken.token) {
            reslove(payload);
          }
        }
        reject(createError.Unauthorized());
      });
    });
  },
};
