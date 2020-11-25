const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.Controller");

router.post("/login", AuthController.login);

router.post("/signup", AuthController.signup);

router.post("/refresh-token", AuthController.refreshToken);

router.delete("/logout", AuthController.logout);

module.exports = router;
