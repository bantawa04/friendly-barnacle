const express = require("express");
const router = express.Router();
const AuthController = require( "../controllers/Auth");


router.post("/login", AuthController.validate("login"), AuthController.login);
// router.post(
//   "/register",
//   AuthController.validate("register"),
//   AuthController.register
// );

module.exports = router;
