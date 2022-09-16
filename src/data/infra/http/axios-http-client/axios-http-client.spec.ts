import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  it('should call axios post method with correct body and url', () => {
    const sut = makeSut()

    const postSpy = jest.spyOn(mockedAxios, 'post')

    const url = faker.internet.url()
    const body = { param: 'any_value' }

    sut.post({ url, body })

    expect(postSpy).toHaveBeenCalledWith(url, body)
  })
})
