import { prismaClient } from '../../database/prisma';
import { CreateProductDto } from './dtos/createProductDTO';

export class ProductRepository {
  public async createProduct(
    createProductDto: CreateProductDto,
    createdAt: Date
  ): Promise<CreateProductDto> {
    const createProduct = {
      ...createProductDto,
      createdAt,
    };
    return await prismaClient.product.create({
      data: createProduct,
    });
  }

  public async getProducts(): Promise<CreateProductDto[]> {
    return await prismaClient.product.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }

  public async getProduct(id: number): Promise<CreateProductDto | null> {
    return await prismaClient.product.findUnique({
      where: { id },
    });
  }

  public async remove(id: number): Promise<CreateProductDto | null> {
    return await prismaClient.product.delete({
      where: { id },
    });
  }
}
