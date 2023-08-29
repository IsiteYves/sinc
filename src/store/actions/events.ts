import { ICreateEventPayload } from '@utils/types/event'
import { GenericResponse } from '@utils/types/global'
import { IEventSchema } from '@utils/types/user'
import { baseAPI } from '../api'

const eventsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation<
      GenericResponse<{ data: IEventSchema }>,
      { body: ICreateEventPayload; activeOrganizationId: number } // Specify the argument types
    >({
      query: ({ body, activeOrganizationId }) => ({
        // Destructure the arguments
        url: `events/v1/post/${activeOrganizationId}/add-event`,
        method: 'POST',
        body,
      }),
    }),
    allEvents: builder.query<
      GenericResponse<{ allEvents: IEventSchema }>,
      string // Pass the organizerId as a parameter here if needed
    >({
      query: (activeOrganizationId) => ({
        url: `events/v1/post/${activeOrganizationId}/organizer-posts?type=EVENT`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useAddEventMutation, useAllEventsQuery } = eventsApi
