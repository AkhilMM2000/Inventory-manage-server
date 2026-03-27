
import { User } from "../../../domain/models/User";
export interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserAuthUseCase {
  execute(data: RegisterUserDTO): Promise<User>;
}
