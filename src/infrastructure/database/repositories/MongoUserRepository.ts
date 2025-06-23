import { injectable } from "tsyringe";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { User } from "../../../domain/models/User";
import { UserDocument, UserModel } from "../models/UserSchema";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class MongoUserRepository extends BaseRepository<User> implements UserRepository {
  protected model = UserModel
    protected map(userDoc:UserDocument ): User {
    return {
      id: userDoc._id.toString(),
      fullName: userDoc.fullName,
      email: userDoc.email,
      password: userDoc.password,
      createdAt: userDoc.createdAt,
    };
  }
  

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email });
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
