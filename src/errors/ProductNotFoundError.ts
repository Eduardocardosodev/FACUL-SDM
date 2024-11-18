export class ProductNotFound extends Error {
  constructor() {
    super('Produto não encontrada.');
    this.name = 'ProductNotFound';
  }
}
