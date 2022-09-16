import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockedAxiosPostResult } from '@/infra/test/mock-axios'
import axios from 'axios'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient<any, any>
  mockedAxios: typeof axios
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  it('should call axios post method with correct body and url', () => {
    const { sut, mockedAxios } = makeSut()

    const postSpy = jest.spyOn(mockedAxios, 'post')

    const url = faker.internet.url()
    const body = { param: 'any_value' }

    sut.post({ url, body })

    expect(postSpy).toHaveBeenCalledWith(url, body)
  })

  it('should return the correct status code and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const postSpy = jest.spyOn(mockedAxios, 'post')

    const url = faker.internet.url()
    const body = { param: 'any_value' }

    const httpResponse = await sut.post({ url, body })

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosPostResult.status,
      body: mockedAxiosPostResult.data,
    })

    expect(postSpy).toHaveBeenCalledWith(url, body)
  })
})
