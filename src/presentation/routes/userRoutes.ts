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

export default router;
