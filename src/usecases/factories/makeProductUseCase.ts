import { ProductRepository } from '../../repository/product/productRepository';
import { ProductService } from '../product/productUseCases';

export function makeProductUseCase() {
  const productRepository = new ProductRepository();
  const productUseCase = new ProductService(productRepository);
  return productUseCase;
}
