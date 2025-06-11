import { container } from "tsyringe";

import { HashService } from "../../application/services/HashService"; 
import { BcryptHashService } from "../services/BcryptHashService";
import { MongoUserRepository } from "../database/repositories/MongoUserRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";


container.register<HashService>("IHashService", {
  useClass: BcryptHashService,
});
container.register<UserRepository>("IUserRepository", {
  useClass: MongoUserRepository,  
});