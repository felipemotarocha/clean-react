import axios from 'axios'

import { HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post<B, R>(params: HttpPostParams<B>): Promise<R> {
    return await axios.post(params.url, params.body)
  }
}
