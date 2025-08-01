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