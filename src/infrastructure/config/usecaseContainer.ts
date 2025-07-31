import { container } from "tsyringe";

import { IAddItemUseCase } from "../../application/use_cases/Item/IAddItemUseCase"; 
import { AddItemUseCase } from "../../application/use_cases/Item/AddItemUseCase";
import { IDeleteItemUseCase } from "../../application/use_cases/Item/IDeleteItemUseCase";
import { DeleteItemUseCase } from "../../application/use_cases/Item/DeleteItemUseCase";
import { IGetAllItemsUseCase } from "../../application/use_cases/Item/IGetAllItemsUseCase";
import { GetAllItemsUseCase } from "../../application/use_cases/Item/GetAllItemsUseCase";
import { IGetItemByIdUseCase } from "../../application/use_cases/Item/IGetItemById";
import { GetItemByIdUseCase } from "../../application/use_cases/Item/GetItemByIdUseCase";


container.register<IAddItemUseCase>("IAddItemUseCase", {
  useClass: AddItemUseCase,
});

container.register<IDeleteItemUseCase>("IDeleteItemUseCase",{
useClass:DeleteItemUseCase
})

container.register<IGetAllItemsUseCase>("IGetAllItemsUseCase", {
  useClass: GetAllItemsUseCase,
});

container.register<IGetItemByIdUseCase>("IGetItemByIdUseCase", {
  useClass: GetItemByIdUseCase,
});