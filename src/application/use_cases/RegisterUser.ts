import { inject, injectable } from "tsyringe";

import { UserRepository } from "../../domain/repositories/UserRepository"; 
import { HashService } from "../services/HashService"; 
import { User } from "../../domain/models/User";
import { AppError } from "../../domain/errors/AppError";

interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
}

@injectable()
export class RegisterUser {
  constructor(
    @inject("IUserRepository") private userRepository: UserRepository,
    @inject("IHashService") private hashService: HashService
  ) {}

  async execute(data: RegisterUserDTO): Promise<Omit<User, "password">> {
    const { fullName, email, password } = data;

    // Check if user already exists
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new AppError("User already exists with this email", 400);
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

    // Return user info without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = createdUser;
    
    return safeUser;
  }
}
