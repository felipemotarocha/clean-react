import HttpPostClient from '../../protocols/http/http-post-client'
import RemoteAuthentication from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post(url: string): Promise<void> {
        this.url = url
      }
    }

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()

    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
