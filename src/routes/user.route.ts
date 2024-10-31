import { Router } from 'express';
import { UserRepository } from '../repository/user/userRepository';
import { UserService } from '../usecases/user/userRepository';
import { UserController } from '../controller/user/userController';

export const userRoutes = Router();
export const eventRoutes = Router();
export const subscription = Router();

const userRepository = new UserRepository();
const user = new UserService(userRepository);
const userController = new UserController(user);

userRoutes.get('/', userController.index);
userRoutes.get('/:id', userController.show);
userRoutes.post('/', userController.insert);
