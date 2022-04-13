import { Router } from "express";
import * as UserController from "../controllers/User";
import * as AuthController from "../controllers/Auth";

const router = new Router();

router.post(
  "/register",
  AuthController.validate("register"),
  AuthController.register
);
router.route("/").get(UserController.getAllUsers);
router.post("/delete/:id", UserController.deleteUser);
router.post("/update", UserController.updateUser);

export default router;
