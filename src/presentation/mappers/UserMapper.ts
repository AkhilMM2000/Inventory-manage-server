import { User } from "../../domain/models/User";
import { UserResponseDTO } from "../dtos/UserResponseDTO";

export class UserMapper {
  static toResponse(user: User): UserResponseDTO {
    return {
      id: user.id || "",
      fullName: user.fullName,
      email: user.email,
    };
  }
}
