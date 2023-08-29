import { type } from 'os'
import { AccountType } from './accountType'
import { IEVENT_SETUP_ENUMS } from './event'
import { GenericResponse, IGate } from './global'
import { IEventSchema, UserSchema } from './user'

export type LoginPayload = {
  username: string
  password: string
  gate: IGate
}

export type AuthResponse = GenericResponse<{
  token: string
  user: UserSchema
  statusCose: number
  isNewUser: boolean
}>

export type SignupPayload = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword?: string
  accountType: AccountType['value']
}
