import { prismaClient } from '../../database/prisma';
import { CreateOrderDto } from './dtos/createOrderDTO';

export class OrderRepository {
  public async createOrder(
    createOrderDto: CreateOrderDto,
    createdAt: Date,
    products: []
  ): Promise<CreateOrderDto> {
    const createOrder = {
      ...createOrderDto,
      createdAt,
    };
    const order = await prismaClient.order.create({
      data: createOrder,
    });

    products.map(async (el) => {
      await prismaClient.orderProduct.create({
        data: {
          orderId: order.id,
          productId: el,
        },
      });
    });

    return order;
  }

  public async getOrders(): Promise<CreateOrderDto[]> {
    return await prismaClient.order.findMany({
      orderBy: [{ id: 'desc' }],
      include: {
        OrderProduct: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  public async getOrder(id: number): Promise<CreateOrderDto | null> {
    return await prismaClient.order.findUnique({
      where: { id },
    });
  }

  public async remove(id: number): Promise<CreateOrderDto | null> {
    return await prismaClient.order.delete({
      where: { id },
    });
  }
}
