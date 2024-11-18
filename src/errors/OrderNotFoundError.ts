export class OrderNotFound extends Error {
  constructor() {
    super('Ordem não encontrada.');
    this.name = 'OrderNotFound';
  }
}
