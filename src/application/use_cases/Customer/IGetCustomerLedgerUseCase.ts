import { CustomerLedgerResponseDTO } from "../../../domain/dtos/CustomerDTO";

export interface ICustomerLedgerUseCase{
    execute(customerId:string):Promise<CustomerLedgerResponseDTO>
}