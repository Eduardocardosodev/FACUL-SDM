import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dtos/createUserDTO';
import { UpdateUserDto } from './dtos/updateUserDTO';
import { prismaClient } from '../../database/prisma';

export class UserRepository {
  public async createUser(
    createUserDto: CreateUserDto,
    createdAt: Date
  ): Promise<CreateUserDto> {
    const createUser = {
      ...createUserDto,
      createdAt,
    };
    return await prismaClient.user.create({
      data: createUser,
    });
  }

  public async getUsers(): Promise<CreateUserDto[]> {
    return await prismaClient.user.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }

  public async updateUser(
    id: number,
    userDTO: UpdateUserDto
  ): Promise<UpdateUserDto | null> {
    return await prismaClient.user.update({
      where: {
        id,
      },
      data: userDTO,
    });
  }

  public async getUser(id: number): Promise<CreateUserDto | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  public async remove(id: number): Promise<CreateUserDto | null> {
    return await prismaClient.user.delete({
      where: { id },
    });
  }
}
