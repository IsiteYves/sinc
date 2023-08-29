import { GenericResponse } from '@utils/types/global'
import { IOrganizationSchema } from '@utils/types/organization'
import { baseAPI } from '../api'

const organizationsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrganizations: builder.query<
      GenericResponse<{ organizations: IOrganizationSchema[] }>,
      void
    >({
      query: () => ({
        url: 'events/v1/organization/user-organizations',
        method: 'GET',
      }),
    }),
    events: builder.query<
      GenericResponse<{ data: EventSchema[] | any }>,
      { organizerId: number | undefined }
    >({
      query: (params) => ({
        url: `events/v1/post/${params.organizerId}/organizer-posts?type=EVENT`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserOrganizationsQuery, useEventsQuery } = organizationsEndpoints
