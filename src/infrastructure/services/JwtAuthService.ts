import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import { AuthService } from "../../application/services/AuthServices";
import { TokenPayload } from "../../shared/AuthTypes";
import { AppError } from "../../domain/errors/AppError";

@injectable()
export class JWTAuthService implements AuthService {
  private _accessSecret = process.env.ACCESS_TOKEN_SECRET!;
  private _refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

  generateAccessToken(payload: object): string {
    return jwt.sign(payload, this._accessSecret, { expiresIn: "25m" });
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this._refreshSecret, { expiresIn: "7d" });
  }

 verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this._accessSecret) as TokenPayload;
    } catch (err) {
          if (err instanceof Error) {
      throw new AppError(err.message, 401);
    }
    throw new AppError("Invalid or expired access token", 401);
  }
    
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this._refreshSecret) as TokenPayload;
    } catch (err) {
       if (err instanceof Error) {
      throw new AppError(err.message, 401);
    }
    throw new AppError("Invalid or expired access token", 401);
    }
  }
}
