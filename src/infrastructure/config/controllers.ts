import { container } from 'tsyringe';
import { ItemController } from '../../presentation/controllers/ItemController';
import { SaleController } from '../../presentation/controllers/SaleController';
import { CustomerController } from '../../presentation/controllers/CustomerController';
import { UserController } from '../../presentation/controllers/UserController';

export const itemController = container.resolve(ItemController);
export const saleController = container.resolve(SaleController);
export const customerController = container.resolve(CustomerController);
export const userController = container.resolve(UserController);
