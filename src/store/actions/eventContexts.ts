import { IEventContextSchema } from '@utils/types/eventContext'
import { GenericResponse } from '@utils/types/global'
import { baseAPI } from '../api'

const eventContextsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEventContexts: builder.query<GenericResponse<{ data: IEventContextSchema[] }>, void>({
      query: () => ({
        url: '/events/v1/post/event-context/all',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetEventContextsQuery } = eventContextsEndpoints
