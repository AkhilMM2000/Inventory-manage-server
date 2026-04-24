import { CreateSaleRequestDTO, SaleResponseDTO } from "../../../domain/dtos/SaleDTO";

export interface ICreateSaleUseCase {
  execute(data: CreateSaleRequestDTO): Promise<SaleResponseDTO>;
}
