export type HttpPostParams = {
  url: string
}

interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>
}

export default HttpPostClient
