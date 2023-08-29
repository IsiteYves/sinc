export type IUploadFileResponse = {
  image: {
    id: number
    url: string
    mimeType: string
    name: string
    FileId: number
    blurhash: string
    updatedAt: string
    createdAt: string
  }
  file: {
    id: number
    userId: number
    name: string
    filePurpose: IFilePurposeEnums
    fileType: 'IMAGE' | 'VIDEO'
    isAcceptable: boolean
    updatedAt: string
    createdAt: string
  }
}

export enum IFilePurposeEnums {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  BACKGROUND_PICTURE = 'BACKGROUND_PICTURE',
  EVENT_FLYER = 'EVENT_FLYER',
}
