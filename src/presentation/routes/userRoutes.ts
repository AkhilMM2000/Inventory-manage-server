import { Router } from "express";

import { UserController } from "../controllers/UserController";

const router = Router();

router
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .post("/refresh-token", UserController.refreshToken)

export default router;
