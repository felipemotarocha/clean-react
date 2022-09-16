import axios from 'axios'

export const mockedAxiosPostResult = {
  status: 201,
  data: { param: 'any_value' },
}

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockedAxiosPostResult)

  return mockedAxios
}
