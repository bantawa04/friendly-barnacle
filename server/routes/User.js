const express = require("express");
const router = express.Router();
const  UserController = require("../controllers/User");
const AuthController = require ("../controllers/Auth");

router.post(
  "/register",
  AuthController.validate("register"),
  AuthController.register
);
router.route("/").get(UserController.getAllUsers);
router.post("/delete/:id", UserController.deleteUser);
router.post("/update", UserController.updateUser);

module.exports = router;
