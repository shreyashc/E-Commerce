const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  loginSchema,
  signupSchema,
  logoutSchema,
  refreshSchema,
};
