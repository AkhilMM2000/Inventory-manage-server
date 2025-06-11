import { injectable } from "tsyringe";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/models/User";
import { UserModel } from "../models/UserSchema";
@injectable()
export class MongoUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = new UserModel(user);
    const result = await createdUser.save();

    return {
      id: result._id.toString(),
      fullName: result.fullName,
      email: result.email,
      password: result.password,
      createdAt: result.createdAt,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      password: user.password,
     
      createdAt: user.createdAt,
    };
  }
}
