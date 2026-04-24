import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../../domain/repositories/UserRepository"; 
import { HashService } from "../../services/HashService"; 
import { User } from "../../../domain/models/User";
import { UserAlreadyExistsError } from "../../../domain/errors/DomainExceptions";
import { IUserAuthUseCase } from "./IRegisterAuthUseCase";
import { RegisterRequestDTO, UserResponseDTO } from "../../../domain/dtos/UserDTO";
import { UserMapper } from "../../mappers/UserMapper";

@injectable()
export class RegisterUserUseCase implements IUserAuthUseCase {
  constructor(
    @inject("IUserRepository") private _userRepository: UserRepository,
    @inject("IHashService") private _hashService: HashService
  ) {}
  
  async execute(data: RegisterRequestDTO): Promise<UserResponseDTO> {
    const { fullName, email, password } = data;

    // Check if user already exists
    const existing = await this._userRepository.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError();
    }

    // Hash the password
    const hashedPassword = await this._hashService.hash(password);

    // Create and store the user
    const newUser: User = {
      fullName,
      email,
      password: hashedPassword,
    };

    const createdUser = await this._userRepository.create(newUser);

    return UserMapper.toResponse(createdUser);
  }
}
