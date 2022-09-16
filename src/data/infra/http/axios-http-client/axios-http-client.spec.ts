import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct url', () => {
    const sut = makeSut()

    const postSpy = jest.spyOn(mockedAxios, 'post')

    const url = faker.internet.url()

    sut.post({ url })

    expect(postSpy).toHaveBeenCalledWith(url)
  })
})
