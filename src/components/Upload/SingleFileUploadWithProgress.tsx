import ProgressBar from '@components/shared/progressBar'
import { Progress } from '@components/shared/shadcnUI/components/ui/progress'
import { useEffect, useState } from 'react'
import { FileHeader } from './FileHeader'

export interface SingleFileUploadWithProgressProps {
  file: File
  onDelete: (file: File) => void
  onUpload: (file: File, url: string) => void
}

const SingleFileUploadWithProgress = ({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const upload = async () => {
      try {
        const url = await uploadFile(file, setProgress)
        onUpload(file, url)
      } catch (error) {
        console.error('Upload error:', error)
      }
    }

    upload()
  }, [])

  return (
    <div className="p-4 mt-20 border border-upload_border rounded-2xl">
      <FileHeader file={file} onDelete={onDelete} progress={progress} />
      <ProgressBar
        progressPercentage={progress}
        progressColor="bg-upload_bar"
        indicatorColor="bg-primary"
      />
    </div>
  )
}

export default SingleFileUploadWithProgress

const uploadFile = (file: File, onProgress: (percentage: number) => void) => {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload'
  const key = 'docs_upload_example_us_preset'

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        resolve(response.secure_url)
      } else {
        reject(new Error('Upload failed'))
      }
    }

    xhr.onerror = (event) => reject(event)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100
        onProgress(Math.round(percentage))
        // console.log(percentage)
      }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', key)

    xhr.send(formData)
  })
}
