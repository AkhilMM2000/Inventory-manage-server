import { inject, injectable } from "tsyringe";

import { UserRepository } from "../../../domain/repositories/UserRepository"; 
import { HashService } from "../../services/HashService"; 
import { AuthService } from "../../services/AuthServices"; 
import { AppError } from "../../../domain/errors/AppError";
import { User } from "../../../domain/models/User";
import { HTTP_STATUS_CODES } from "../../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../../constants/ErrorMessage";

interface LoginDTO {
  email: string;
  password: string;
}

@injectable()
export class LoginUser {
  constructor(
    @inject("IUserRepository") private userRepository: UserRepository,
    @inject("IHashService") private hashService: HashService,
    @inject("IAuthService") private authService: AuthService
  ) {}

  async execute(data: LoginDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, "password">;
  }> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS_CODES.UNAUTHORIZED);
    }

    const isMatch = await this.hashService.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const payload = { userId: user.id!, email: user.email,name:user.fullName };
    const accessToken = this.authService.generateAccessToken(payload);
    const refreshToken = this.authService.generateRefreshToken(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user;

    return {
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }
}
