class NotFoundError extends Error {
  constructor() {
    super('Não encontrado')
    this.name = 'NotFoundError'
  }
}

export default NotFoundError
