import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http'

export class HttpPostClientSpy<B, R> implements HttpPostClient<B, R> {
  url?: string
  body?: B
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  }

  async post(params: HttpPostParams<B>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}
