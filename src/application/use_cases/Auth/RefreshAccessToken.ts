import { inject, injectable } from "tsyringe";

import { AuthService } from "../../services/AuthServices"; 
import { AppError } from "../../../domain/errors/AppError";
import { TokenPayload } from "../../../shared/AuthTypes"; 
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";

@injectable()
export class RefreshAccessToken {
  constructor(
    @inject("IAuthService") private authService: AuthService
  ) {}

  execute(refreshToken: string): string {
    if (!refreshToken) {
      throw new AppError( ERROR_MESSAGES.REFRESH_TOKEN_MISS , HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    let payload: TokenPayload;
    try {
      payload = this.authService.verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(ERROR_MESSAGES.INVALID_REFRESH_TOKEN, HTTP_STATUS_CODES.FORBIDDEN);
    }

    return this.authService.generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });
  }
}
