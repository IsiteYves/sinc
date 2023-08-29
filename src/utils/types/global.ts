export enum Account_Types_Enums {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export type ToastPlacementTypes =
  | 'bottom'
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-right'

export enum IGENDER_ENUMNS {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export type GenericResponse<T> = {
  statusCode: number
  message: string
  data: T
}

export enum IGate {
  MOBILE = 'MOBILE',
  ORGANIZER_DASHBOARD = 'ORGANIZER_DASHBOARD',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
}
