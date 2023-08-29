import { AuthResponse } from '@utils/types/auth'
import { GenericResponse } from '@utils/types/global'
import { IOTP_REQUEST_PAYLOAD } from '@utils/types/otp'
import { baseAPI } from '../api'

const otpApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtp: builder.mutation<AuthResponse, string>({
      query: (otp) => ({
        url: `/v1/users/verify/${otp}`,
        method: 'GET',
      }),
    }),
    requestOtp: builder.mutation<
      GenericResponse<{ email: string; otp: string }>,
      IOTP_REQUEST_PAYLOAD
    >({
      query: (body) => ({
        url: '/v1/users/request-otp',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useVerifyOtpMutation, useRequestOtpMutation } = otpApi
