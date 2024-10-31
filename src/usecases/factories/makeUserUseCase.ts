import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../repository/user/userRepository';
import { UserService } from '../user/userRepository';

export function makeUserUseCase() {
  const prismaClient = new PrismaClient();
  const userRepository = new UserRepository(prismaClient);
  const userUseCase = new UserService(userRepository);
  return userUseCase;
}
