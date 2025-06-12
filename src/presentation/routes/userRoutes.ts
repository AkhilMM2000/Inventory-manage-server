import { Router } from "express";

import { UserController } from "../controllers/UserController";
import { container } from "tsyringe";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
const authMiddleware = container.resolve(AuthMiddleware);
const router = Router();

router
  .post("/register", UserController.register)
  .post("/login",UserController.login)
  .post("/refresh-token", UserController.refreshToken)
  .post("/logout", authMiddleware.protectRoute(), UserController.logout);
export default router;
