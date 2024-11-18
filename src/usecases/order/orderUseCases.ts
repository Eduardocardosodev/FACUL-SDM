import { OrderNotFound } from '../../errors/OrderNotFoundError';
import { CreateOrderDto } from '../../repository/order/dtos/createOrderDTO';
import { OrderRepository } from '../../repository/order/orderRepository';

interface OrderDTO {
  id?: number;
  code: string;
  userId: number;
}

export class OrderService {
  constructor(private OrderRepository: OrderRepository) {}

  private mapOrderDTOToOrder(OrderDTO: OrderDTO) {
    return {
      id: OrderDTO.id,
      code: OrderDTO.code,
      userId: OrderDTO.userId,
    };
  }

  public async getOrders(): Promise<OrderDTO[]> {
    const Orders = await this.OrderRepository.getOrders();

    if (Orders.length === 0) {
      throw new OrderNotFound();
    }

    return Orders;
  }

  public async getOrder(id: number): Promise<OrderDTO> {
    const Order = await this.OrderRepository.getOrder(id);

    if (!Order) {
      throw new OrderNotFound();
    }

    return this.mapOrderDTOToOrder(Order);
  }

  public async createOrder(
    OrderDTO: CreateOrderDto,
    products: []
  ): Promise<OrderDTO> {
    const createAt = new Date();

    const createOrder = await this.OrderRepository.createOrder(
      {
        code: OrderDTO.code,
        userId: OrderDTO.userId,
      },
      createAt,
      products
    );

    return this.mapOrderDTOToOrder(createOrder);
  }
}
