import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test'
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import RemoteAuthentication from './remote-authentication'
import { HttpStatusCode } from '@/data/protocols/http'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import {
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >()

  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const params = mockAuthentication()

    await sut.auth(params)

    expect(httpPostClientSpy.body).toEqual(params)
  })

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response.statusCode = HttpStatusCode.unauthorized

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response.statusCode = HttpStatusCode.badRequest

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw NotFoundError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response.statusCode = HttpStatusCode.notFound

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response.statusCode = HttpStatusCode.serverError

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResult = mockAccountModel()

    httpPostClientSpy.response.statusCode = HttpStatusCode.ok
    httpPostClientSpy.response.body = httpResult

    const result = await sut.auth(mockAuthentication())

    expect(result).toEqual(httpResult)
  })
})
