import { Account_Types_Enums, IGENDER_ENUMNS } from './global'
import { IOrganizationSchema } from './organization'

export type UserSchema = {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  gender: IGENDER_ENUMNS
  dateOfBirth: string
  phoneNumber: string
  pushNotification: boolean
  twoFAenabled: boolean
  twoFAverified: boolean
  isPrivate: boolean
  imageId: number
  fileId: number
  pastProfileImages: []
  bgImageId?: number
  bio?: string
  bgFileId?: number
  imageUrl?: string
  bgUrl?: string
  pastBgImages: []
  isVerified: boolean
  isBlocked: boolean
  isUserOnboarded: boolean
  isOrganizerOnboarded: boolean
  accountType: Account_Types_Enums
  isActive: boolean
  registrationMethod: string
  appleId: string
  googleId: string
  googleRefreshToken: string
  createdAt: string
  updatedAt: string
  maxDistance: number
  subscriptionsCount: number
  subscriptions: []
  subscribersCount: number
  subscribers: []
}
export type UserInitialState = {
  token?: string
  user?: UserSchema
  activeOrganization?: IOrganizationSchema
  verifyEmail?: string
}

export type eventInitialState = {
  isLoggedIn: boolean
  token?: string
  event?: IEventSchema
}
export interface UserInfoProps {
  user: {
    userId: string
    image: string
    names: string
    email: string
    role: string
    added: string
    invited: boolean
  }
}

export type IEventSchema = {
  id: number
  accountType: Account_Types_Enums
  createdAt: string
  updatedAt: string
  name: string
  description: string
  flyer: string
  locationName: string
}
