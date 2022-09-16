import axios from 'axios'

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http'

export class AxiosHttpClient<B, R> implements HttpPostClient<B, R> {
  async post(params: HttpPostParams<B>): Promise<HttpResponse<R>> {
    const { status, data } = await axios.post(params.url, params.body)

    return {
      statusCode: status,
      body: data,
    }
  }
}
