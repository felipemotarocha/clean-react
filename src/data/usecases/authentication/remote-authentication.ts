import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import {
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body!
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.notFound:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}

export default RemoteAuthentication
