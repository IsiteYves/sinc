import { GenericResponse } from '@utils/types/global'
import { UserSchema } from '@utils/types/user'

import { AuthResponse, LoginPayload, SignupPayload } from '../../utils/types/auth'
import { baseAPI } from '../api'

interface IGoogleSignupPayload {
  username: string
}
const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({
        url: 'v1/auth/register',
        method: 'POST',
        body,
      }),
    }),
    googleSignup: builder.mutation<AuthResponse, IGoogleSignupPayload>({
      query: (body) => ({
        url: 'v1/auth/google/register',
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<AuthResponse, { secretPhrase: string; password: string }>({
      query: (body) => ({
        url: 'v1/users/change-password',
        method: 'PATCH',
        body,
      }),
    }),
    profile: builder.query<GenericResponse<UserSchema>, void>({
      query: () => ({
        url: 'v1/users/profile',
        method: 'GET',
      }),
    }),
    googleCallBack: builder.mutation<AuthResponse, { code: string }>({
      query: (body) => ({
        url: 'v1/auth/google',
        method: 'POST',
        body,
      }),
    }),
    requestOtp: builder.mutation<GenericResponse<{ email: string }>, string>({
      query: (body) => ({
        url: `v1/users/request-otp`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<GenericResponse<{ message: string }>, string>({
      query: (body) => ({
        url: `v1/users/resetPassword`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useGoogleSignupMutation,
  useChangePasswordMutation,
  useProfileQuery,
  useLazyProfileQuery,
  useGoogleCallBackMutation,
  useRequestOtpMutation,
  useResetPasswordMutation,
} = userEndpoints
