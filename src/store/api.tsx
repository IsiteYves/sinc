import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@utils/constants'
import { RootState } from './index'

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const {
        userReducer: { token },
      } = getState() as RootState
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Profile', 'addEvent', 'AllEvents'],
  endpoints: () => ({}),
})
