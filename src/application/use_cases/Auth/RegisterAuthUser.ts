import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../../domain/repositories/UserRepository"; 
import { HashService } from "../../services/HashService"; 
import { User } from "../../../domain/models/User";
import { UserAlreadyExistsError } from "../../../domain/errors/DomainExceptions";
import { IUserAuthUseCase } from "./IRegisterAuthUseCase";
interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
}
@injectable()
export class RegisterUserUseCase implements IUserAuthUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: UserRepository,
    @inject("IHashService") private hashService: HashService
  ) {}
  
  async execute(data: RegisterUserDTO): Promise<User> {
    const { fullName, email, password } = data;

    // Check if user already exists
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError();
    }

    // Hash the password
    const hashedPassword = await this.hashService.hash(password);

    // Create and store the user
    const newUser: User = {
      fullName,
      email,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(newUser);

    return createdUser;
  }
}
