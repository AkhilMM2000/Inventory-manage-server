import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { RegisterUser } from "../../application/use_cases/RegisterUser";
import { LoginUser } from "../../application/use_cases/LoginUser";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, email, password } = req.body;

      const registerUser = container.resolve(RegisterUser);
      const user = await registerUser.execute({ fullName, email, password });

      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }
   static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const loginUser = container.resolve(LoginUser);
      const { accessToken, refreshToken, user } = await loginUser.execute({ email, password });

      // ✅ Set refreshToken in HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

      res.status(200).json({
        accessToken,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
}
