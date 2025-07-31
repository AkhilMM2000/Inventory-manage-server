import { container } from "tsyringe";

import { IAddItemUseCase } from "../../application/use_cases/Item/IAddItemUseCase"; 
import { AddItemUseCase } from "../../application/use_cases/Item/AddItemUseCase";
import { IDeleteItemUseCase } from "../../application/use_cases/Item/IDeleteItemUseCase";
import { DeleteItemUseCase } from "../../application/use_cases/Item/DeleteItemUseCase";


container.register<IAddItemUseCase>("IAddItemUseCase", {
  useClass: AddItemUseCase,
});

container.register<IDeleteItemUseCase>("IDeleteItemUseCase",{
useClass:DeleteItemUseCase
})