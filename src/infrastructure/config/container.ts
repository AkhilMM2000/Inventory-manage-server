import { container } from "tsyringe";

import { HashService } from "../../application/services/HashService"; 
import { BcryptHashService } from "../services/BcryptHashService";
import { MongoUserRepository } from "../database/repositories/MongoUserRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../../application/services/AuthServices";
import { JWTAuthService } from "../services/JwtAuthService";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { MongoItemRepository } from "../database/repositories/MongoItemRepository";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { MongoCustomerRepository } from "../database/repositories/MongoCostomerRepository";


container.register<HashService>("IHashService", {
  useClass: BcryptHashService,
});
container.register<UserRepository>("IUserRepository", {
  useClass: MongoUserRepository,  
});

//  Register AuthService
container.register<AuthService>("IAuthService", {
  useClass: JWTAuthService,
});

container.register<IItemRepository>("IItemRepository",{
 useClass:MongoItemRepository  ,
});

container.register<ICustomerRepository>("ICustomerRepository",{
 useClass:MongoCustomerRepository,
})