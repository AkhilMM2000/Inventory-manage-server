import { container } from "tsyringe";

import { IAddItemUseCase } from "../../application/use_cases/Item/IAddItemUseCase"; 
import { AddItemUseCase } from "../../application/use_cases/Item/AddItemUseCase";
import { IDeleteItemUseCase } from "../../application/use_cases/Item/IDeleteItemUseCase";
import { DeleteItemUseCase } from "../../application/use_cases/Item/DeleteItemUseCase";
import { IGetAllItemsUseCase } from "../../application/use_cases/Item/IGetAllItemsUseCase";
import { GetAllItemsUseCase } from "../../application/use_cases/Item/GetAllItemsUseCase";
import { IGetItemByIdUseCase } from "../../application/use_cases/Item/IGetItemById";
import { GetItemByIdUseCase } from "../../application/use_cases/Item/GetItemByIdUseCase";
import { ISearchItemsUseCase } from "../../application/use_cases/Item/ISearchItemsUseCase";
import { SearchItemsUseCase } from "../../application/use_cases/Item/SearchItemsUseCase";
import { CreateSale } from "../../application/use_cases/sales/CreateSale";
import { ICreateSaleUseCase } from "../../application/use_cases/sales/ISaleUseCase";
import { IGetAllSales } from "../../application/use_cases/sales/IGetAllSaleUseCase";
import { GetAllSales } from "../../application/use_cases/sales/GetAllSaleUseCase";
import { AddCustomer } from "../../application/use_cases/Customer/AddCustomerUseCase";
import { IAddCustomerUseCase } from "../../application/use_cases/Customer/IAddCustomerUseCase";
import { GetAllCustomers } from "../../application/use_cases/Customer/GetAllCustomerUseCase";
import { IGetAllCustomers } from "../../application/use_cases/Customer/IGetAllCustomerUseCase";
import { IUpdateCustomerUseCase } from "../../application/use_cases/Customer/IUpdateCustomerUseCase";
import { UpdateCustomerUseCase } from "../../application/use_cases/Customer/UpdateCustomerUseCase";
import { IDeleteCustomerUseCase } from "../../application/use_cases/Customer/IDeleteCustomerUseCase";
import { DeleteCustomerUseCase } from "../../application/use_cases/Customer/DeleteCustomerUseCase";
import { ILoginUserUseCase } from "../../application/use_cases/Auth/ILoginUserUseCase";
import { LoginUserUseCase } from "../../application/use_cases/Auth/LoginUserUseCase";
import { IUserAuthUseCase } from "../../application/use_cases/Auth/IRegisterAuthUseCase";
import { RegisterUserUseCase } from "../../application/use_cases/Auth/RegisterAuthUser";
import { IRefreshAccessTokenUseCase } from "../../application/use_cases/Auth/IRefreshAccessTokenUseCase";
import { RefreshAccessToken } from "../../application/use_cases/Auth/RefreshAccessTokenUseCase";


container.register<IAddItemUseCase>("IAddItemUseCase", {
  useClass: AddItemUseCase,
});

container.register<IDeleteItemUseCase>("IDeleteItemUseCase",{
useClass:DeleteItemUseCase
})

container.register<IGetAllItemsUseCase>("IGetAllItemsUseCase", {
  useClass: GetAllItemsUseCase,
});
container.register<ISearchItemsUseCase>("ISearchItemsUseCase", {
  useClass: SearchItemsUseCase,
});

container.register<IGetItemByIdUseCase>("IGetItemByIdUseCase", {
  useClass: GetItemByIdUseCase,
});

container.register<ICreateSaleUseCase>("ICreateSaleUseCase", {
  useClass: CreateSale,
});

container.register<IGetAllSales>("IGetAllSales", {
  useClass: GetAllSales,
});
container.register<IAddCustomerUseCase>("IAddCustomerUseCase", {
  useClass: AddCustomer,
});

container.register<IGetAllCustomers>("IGetAllCustomerUseCase", {
  useClass: GetAllCustomers,
});
container.register<IUpdateCustomerUseCase>("IUpdateCustomerUseCase", {
  useClass: UpdateCustomerUseCase,
});
container.register<IDeleteCustomerUseCase>("IDeleteCustomerUseCase",{
  useClass:DeleteCustomerUseCase
});
container.register<ILoginUserUseCase>("ILoginUserUseCase", {
  useClass: LoginUserUseCase,
});
container.register<IUserAuthUseCase>("IUserAuthUseCase",{
  useClass:RegisterUserUseCase
})

container.register<IRefreshAccessTokenUseCase>('IRefreshAccessTokenUseCase',{
  useClass:RefreshAccessToken
})