export type HttpPostParams = {
  url: string
  body?: object
}

interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>
}

export default HttpPostClient
