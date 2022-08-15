import { HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body?: object
}

interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}

export default HttpPostClient
