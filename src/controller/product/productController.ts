import { Request, Response } from 'express';
import { ProductNotFound } from '../../errors/ProductNotFoundError';
import { ProductService } from '../../usecases/product/productUseCases';
import { makeProductUseCase } from '../../usecases/factories/makeProductUseCase';

export class ProductController {
  private ProductService: ProductService;

  constructor(ProductService: ProductService) {
    this.ProductService = ProductService;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const Product = await this.ProductService.getProducts();

      res.status(200).json({ Product });
    } catch (error: any) {
      if (error instanceof ProductNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar produto' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const Product = await this.ProductService.getProduct(Number(id));

      res.status(200).json({ Product });
    } catch (error: any) {
      if (error instanceof ProductNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar produto' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductUseCase = makeProductUseCase();

      const { name, description, price, category } = req.body;

      const Product = await ProductUseCase.createProduct({
        name,
        description,
        price,
        category,
      });

      res.status(201).json({ message: 'produto criada com sucesso.', Product });
    } catch (error: any) {
      console.log(error.message);
    }
  };
}
