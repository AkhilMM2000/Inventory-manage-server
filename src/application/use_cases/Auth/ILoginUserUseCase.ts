import { User } from "../../../domain/models/User";

export interface ILoginUserUseCase {
  execute(data: {
    email: string;
    password: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>;
}
