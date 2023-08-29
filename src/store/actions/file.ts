import { baseAPI } from '../api'
import { IUploadFileResponse } from '@utils/types/file'
import { GenericResponse } from '@utils/types/global'

const fileEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    useUploadSingleFile: builder.mutation<GenericResponse<IUploadFileResponse>, FormData>({
      query: (body) => ({
        url: '/files/v1/upload/single',
        method: 'POST',
        body,
      }),
    }),
    useUploadMultipleFilesUpload: builder.mutation<
      GenericResponse<IUploadFileResponse[]>,
      FormData
    >({
      query: (body) => ({
        url: '/files/v1/upload/multiple',
        method: 'POST',
        body,
      }),
    }),
    useDeleteUploadedFile: builder.mutation<GenericResponse<any>, string>({
      query: (fileId) => ({
        url: `/files/v1/files/delete/${fileId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useUseUploadSingleFileMutation,
  useUseUploadMultipleFilesUploadMutation,
  useUseDeleteUploadedFileMutation,
} = fileEndpoints
