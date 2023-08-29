import ProgressBar from '@components/shared/progressBar'
import { FileHeader } from './FileHeader'
import { FileError } from 'react-dropzone'

export interface UploadErroProps {
  file: File
  onDelete: (file: File) => void
  errors: FileError[]
}

export const UploadError = ({ file, onDelete, errors }: UploadErroProps) => {
  return (
    <div className="border border-upload_border rounded-2xl p-2 mt-20">
      <FileHeader file={file} onDelete={onDelete} />
      <ProgressBar
        progressPercentage={100}
        progressColor="bg-border_bar"
        indicatorColor="bg-red-500"
      />
      {errors?.map((error, idx) => <span key={idx}>{error.message}</span>)}
    </div>
  )
}
