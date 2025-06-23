import { User } from "../models/User";

export interface UserRepository {

    create(data: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
