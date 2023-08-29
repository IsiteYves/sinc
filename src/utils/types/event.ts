import { StaticImageData } from 'next/image'
import { ITicketSchema } from './ticket'

export type EventDatas = {
  image: StaticImageData
  name: string
  location: string
  date: string
}

export type EventDatasProps = {
  results: EventDatas[]
}

export enum IEVENT_SETUP_ENUMS {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
}

export type ICreateEventPayload = {
  name: string
  location: string
  startDate: string
  endDate: string
  maxAttendance: number
  longitude: number
  latitude: number
  setup: IEVENT_SETUP_ENUMS
  EventContextId?: number
  description: string
  tickets: ITicketSchema[]
  files: ICreatEventFileSchema[]
}

export type ICreatEventFileSchema = {
  imageId: number
  fileId: number
  isMainFlyer: boolean
  url: string
  blurhash: string
  fileType: 'IMAGE' | 'VIDEO'
}
