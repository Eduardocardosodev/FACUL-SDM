import { Router } from 'express';
import { UserRepository } from '../repository/user/userRepository';
import { UserService } from '../usecases/user/userRepository';
import { UserController } from '../controller/user/userController';
import { OrderRepository } from '../repository/order/orderRepository';
import { OrderService } from '../usecases/order/orderUseCases';
import { OrderController } from '../controller/order/orderController';
import { ProductRepository } from '../repository/product/productRepository';
import { ProductService } from '../usecases/product/productUseCases';
import { ProductController } from '../controller/product/productController';

export const userRoutes = Router();
export const productRoutes = Router();
export const orderRoutes = Router();

const userRepository = new UserRepository();
const user = new UserService(userRepository);
const userController = new UserController(user);

const orderRepository = new OrderRepository();
const order = new OrderService(orderRepository);
const orderController = new OrderController(order);

const productRepository = new ProductRepository();
const product = new ProductService(productRepository);
const productController = new ProductController(product);

userRoutes.get('/', userController.index);
userRoutes.get('/:id', userController.show);
userRoutes.post('/', userController.insert);

orderRoutes.get('/', orderController.index);
orderRoutes.get('/:id', orderController.show);
orderRoutes.post('/', orderController.insert);

productRoutes.get('/', productController.index);
productRoutes.get('/:id', productController.show);
productRoutes.post('/', productController.insert);
