export interface CreateProductDto {
  id?: number | null;
  name: string;
  description: string;
  price: number;
  category: string;
}
