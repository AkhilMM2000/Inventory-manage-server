import { container } from "tsyringe";
import "./usecaseContainer";

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
import { ISaleRepository } from "../../domain/repositories/ISaleRepository";
import { MongoSaleRepository } from "../database/repositories/MongoSaleRepository";
import { UpdateItemUseCase } from "../../application/use_cases/Item/UpdateItem";
import { IUpdateItemUseCase } from "../../application/use_cases/Item/IUpdateItemUseCase";
import { ICustomerLedgerUseCase } from "../../application/use_cases/Customer/IGetCustomerLedgerUseCase";
import { GetCustomerLedgerUseCase } from "../../application/use_cases/Customer/GetCustomerLedgerUseCase";


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
container.register<ISaleRepository>("ISaleRepository",{
  useClass:MongoSaleRepository
})
container.register<IUpdateItemUseCase>("IUpdateItemUseCase", {
  useClass: UpdateItemUseCase,
});
container.register< ICustomerLedgerUseCase>("ICustomerLedgerUseCase",{
  useClass:GetCustomerLedgerUseCase
})