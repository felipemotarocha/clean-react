import { HttpResponse } from './http-response'

export type HttpPostParams<B> = {
  url: string
  body?: B
}

interface HttpPostClient<B, R> {
  post(params: HttpPostParams<B>): Promise<HttpResponse<R>>
}

export default HttpPostClient
