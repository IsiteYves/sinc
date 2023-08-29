import { IPermissionSchema } from './permissions'

export type IOrganizationSchema = {
  id: number
  userId: number
  email: string
  isOwner: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  OrganizerProfileId: number
  OrganizerProfile: {
    id: number
    ownerId: number
    isActive: number
    createdAt: string
    updatedAt: string
  }
  OrganizerPermissions: {
    id: number
    active: boolean
    createdAt: string
    updatedAt: string
    PermissionId: number
    OrganizerId: number
    Permission: IPermissionSchema
  }
  owner: {
    accountType: string
    bgUrl: null
    createdAt: string
    email: string
    firstName: string
    id: number
    imageUrl: null
    isActive: true
    isPrivate: boolean
    lastName: string
    maxDistance: number
    subscribersCount: number
    subscriptionCount: number
    username: string
  }
}
