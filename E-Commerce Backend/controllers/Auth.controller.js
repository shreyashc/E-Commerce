const User = require("../models/User.model");
const createError = require("http-errors");
const RefreshToken = require("../models/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");
module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw createError.BadRequest("Invalid username/password");
      }
      const isCorrectPassword = await user.isValidPassword(password);
      if (!isCorrectPassword) {
        throw createError.BadRequest("Invalid username/password");
      }
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      res.send({ accessToken, refreshToken, role: user.role });
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const doesExists = await User.findOne({ username, email });
      if (doesExists) {
        throw createError.Conflict(`username/email is already registered`);
      }
      const user = new User({
        username,
        email,
        password,
        role: "customer",
      });
      const savedUser = await user.save();
      const accessToken = await generateAccessToken(savedUser);
      const refreshToken = await generateRefreshToken(savedUser);
      res.send({ accessToken, refreshToken, role: "customer" });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const rToken = req.body.refreshToken;
      if (!rToken) throw createError.BadRequest();
      const payload = await verifyRefreshToken(rToken);
      const accessToken = await generateAccessToken({
        id: payload.userId,
        role: payload.role,
      });
      const refreshToken = await generateRefreshToken({
        id: payload.userId,
        role: payload.role,
      });
      res.send({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const payload = await verifyRefreshToken(refreshToken);
      await RefreshToken.findOneAndDelete({ user: payload.userId });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};
