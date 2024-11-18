import { UserRepository } from '../../repository/user/userRepository';
import { UserService } from '../user/userRepository';

export function makeUserUseCase() {
  const userRepository = new UserRepository();
  const userUseCase = new UserService(userRepository);
  return userUseCase;
}
