import { OrderRepository } from '../../repository/order/orderRepository';
import { OrderService } from '../order/orderUseCases';

export function makeOrderUseCase() {
  const orderRepository = new OrderRepository();
  const orderUseCase = new OrderService(orderRepository);
  return orderUseCase;
}
