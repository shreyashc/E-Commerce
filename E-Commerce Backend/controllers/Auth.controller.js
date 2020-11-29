const User = require("../models/User.model");
const createError = require("http-errors");
const RefreshToken = require("../models/RefreshToken.model");

const {
  loginSchema,
  signupSchema,
  logoutSchema,
  refreshSchema,
} = require("../helpers/Validations");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = await loginSchema.validateAsync(req.body);
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
      if (error.isJoi === true) error.status = 400;

      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { username, email, password } = await signupSchema.validateAsync(
        req.body
      );

      const usernameExists = await User.findOne({ username });
      const emailExists = await User.findOne({ email });

      if (usernameExists) {
        throw createError.Conflict(`username is already registered`);
      }
      if (emailExists) {
        throw createError.Conflict(`email is already registered`);
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
      if (error.isJoi === true) error.status = 400;

      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken: rToken } = await refreshSchema.validateAsync(
        req.body
      );

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
      if (error.isJoi === true) error.status = 400;

      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = await logoutSchema.validateAsync(req.body);

      if (!refreshToken) throw createError.BadRequest();
      const payload = await verifyRefreshToken(refreshToken);
      await RefreshToken.findOneAndDelete({ user: payload.userId });
      res.sendStatus(204);
    } catch (error) {
      if (error.isJoi === true) error.status = 400;
      next(error);
    }
  },
};
