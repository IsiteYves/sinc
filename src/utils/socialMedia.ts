import { google, apple } from '@utils/images'
import { BASE_API_URL } from '@utils/constants'

export const mediaData = [
  {
    name: google,
    url: `${BASE_API_URL}/v1/auth/google`,
  },
  // {
  //   name: apple,
  //   url: `${BASE_API_URL}`,
  // },
]
