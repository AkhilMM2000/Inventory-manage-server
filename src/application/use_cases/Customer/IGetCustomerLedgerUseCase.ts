export interface ICustomerLedgerUseCase{
    execute(customerId:string):Promise<any>
}