export class UnexpectedError extends Error {
  constructor() {
    super('Erro inesperado')
    this.name = 'UnexpectedError'
  }
}
