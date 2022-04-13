import { Router } from "express";
import * as AuthController from "../controllers/Auth";

const router = new Router();

router.post("/login", AuthController.validate("login"), AuthController.login);
// router.post(
//   "/register",
//   AuthController.validate("register"),
//   AuthController.register
// );

export default router;
