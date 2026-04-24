import { LoginRequestDTO, UserResponseDTO } from "../../../domain/dtos/UserDTO";

export interface ILoginUserUseCase {
  execute(data: LoginRequestDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDTO;
  }>;
}
