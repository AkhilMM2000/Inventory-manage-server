export  interface IDeleteCustomerUseCase{
     execute(customerId: string): Promise<void>
}