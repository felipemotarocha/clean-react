import HttpPostClient from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import InvalidCredentialsError from '@/domain/errors/invalid-credentials-error'
import NotFoundError from '@/domain/errors/not-found-error'
import UnexpectedError from '@/domain/errors/unexpected-error'
import AccountModel from '@/domain/models/account'
import Authentication, {
  AuthenticationParams,
} from '@/domain/usecases/authentication'

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
