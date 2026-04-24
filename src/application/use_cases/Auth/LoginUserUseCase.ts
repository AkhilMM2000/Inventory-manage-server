import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../../domain/repositories/UserRepository"; 
import { HashService } from "../../services/HashService"; 
import { AuthService } from "../../services/AuthServices"; 
import { InvalidCredentialsError } from "../../../domain/errors/DomainExceptions";
import { User } from "../../../domain/models/User";
import { ILoginUserUseCase } from "./ILoginUserUseCase";
import { LoginRequestDTO, UserResponseDTO } from "../../../domain/dtos/UserDTO";
import { UserMapper } from "../../mappers/UserMapper";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: UserRepository,
    @inject("IHashService") private hashService: HashService,
    @inject("IAuthService") private authService: AuthService
  ) {}

  async execute(data: LoginRequestDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDTO;
  }> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await this.hashService.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    const payload = { userId: user.id!, email: user.email,name:user.fullName };
    const accessToken = this.authService.generateAccessToken(payload);
    const refreshToken = this.authService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toResponse(user),
    };
  }
}
