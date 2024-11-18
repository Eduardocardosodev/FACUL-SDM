import { ProductNotFound } from '../../errors/ProductNotFoundError';
import { CreateProductDto } from '../../repository/product/dtos/createProductDTO';
import { ProductRepository } from '../../repository/product/productRepository';

interface ProductDTO {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export class ProductService {
  constructor(private ProductRepository: ProductRepository) {}

  private mapProductDTOToProduct(ProductDTO: ProductDTO) {
    return {
      id: ProductDTO.id,
      name: ProductDTO.name,
      description: ProductDTO.description,
      price: ProductDTO.price,
      category: ProductDTO.category,
    };
  }

  public async getProducts(): Promise<ProductDTO[]> {
    const Products = await this.ProductRepository.getProducts();

    if (Products.length === 0) {
      throw new ProductNotFound();
    }

    return Products.map((ProductDTO) =>
      this.mapProductDTOToProduct(ProductDTO)
    );
  }

  public async getProduct(id: number): Promise<ProductDTO> {
    const Product = await this.ProductRepository.getProduct(id);

    if (!Product) {
      throw new ProductNotFound();
    }

    return this.mapProductDTOToProduct(Product);
  }

  public async createProduct(
    ProductDTO: CreateProductDto
  ): Promise<ProductDTO> {
    const createAt = new Date();

    const createProduct = await this.ProductRepository.createProduct(
      {
        name: ProductDTO.name,
        description: ProductDTO.description,
        price: ProductDTO.price,
        category: ProductDTO.category,
      },
      createAt
    );

    return this.mapProductDTOToProduct(createProduct);
  }
}
