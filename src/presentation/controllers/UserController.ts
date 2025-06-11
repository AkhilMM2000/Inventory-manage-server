import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { RegisterUser } from "../../application/use_cases/RegisterUser";

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
}
