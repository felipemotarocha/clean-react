class UnexpectedError extends Error {
  constructor() {
    super('Erro inesperado')
    this.name = 'UnexpectedError'
  }
}

export default UnexpectedError
