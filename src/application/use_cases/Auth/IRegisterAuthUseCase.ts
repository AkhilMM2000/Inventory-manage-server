import { RegisterRequestDTO, UserResponseDTO } from "../../../domain/dtos/UserDTO";

export interface IUserAuthUseCase {
  execute(data: RegisterRequestDTO): Promise<UserResponseDTO>;
}
