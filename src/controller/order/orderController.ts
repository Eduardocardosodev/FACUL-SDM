import { Request, Response } from 'express';
import { OrderService } from '../../usecases/order/orderUseCases';
import { OrderNotFound } from '../../errors/OrderNotFoundError';
import { makeOrderUseCase } from '../../usecases/factories/makeOrderUseCase';

export class OrderController {
  private OrderService: OrderService;

  constructor(OrderService: OrderService) {
    this.OrderService = OrderService;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const Order = await this.OrderService.getOrders();

      res.status(200).json({ Order });
    } catch (error: any) {
      if (error instanceof OrderNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar ordem' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Order = await this.OrderService.getOrder(Number(id));

      res.status(200).json({ Order });
    } catch (error: any) {
      if (error instanceof OrderNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar ordem' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const OrderUseCase = makeOrderUseCase();

      const { code, userId, products } = req.body;

      const Order = await OrderUseCase.createOrder(
        {
          code,
          userId,
        },
        products
      );

      res.status(201).json({ message: 'Ordem criada com sucesso.', Order });
    } catch (error: any) {
      console.log(error.message);
    }
  };
}
