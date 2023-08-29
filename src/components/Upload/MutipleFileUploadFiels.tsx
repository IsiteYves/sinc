import { useCallback, useEffect, useState } from 'react'
import { Accept, DropzoneOptions, FileError, FileRejection, useDropzone } from 'react-dropzone'
import SingleFileUploadWithProgress from './SingleFileUploadWithProgress'
import { useField } from 'formik'
import { UploadError } from './UploadError'

export interface UploadableFile {
  file: File
  errors: FileError[]
  url?: string
}

const MultipleFileUploadFields = ({ name }: { name: string }) => {
  // const [__, _, helpers] = useField(name);
  const [files, setFiles] = useState<UploadableFile[]>([])
  const onDrop = useCallback((accFiles: File[], rejFilees: FileRejection[]) => {
    const mappedAccFiles = accFiles.map((file) => ({ file, errors: [] }))
    setFiles((curr) => [...curr, ...mappedAccFiles, ...rejFilees])
  }, [])

  // useEffect(() => {
  //   helpers.setValue(files);
  //   // helpers.setTouched(true);
  // }, [files]);

  const onUpload = (file: File, url: string) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url }
        }
        return fw
      }),
    )
  }

  const onDelete = (file: File) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file))
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*', 'video/*', '.pdf'] as DropzoneOptions | any,
  })
  return (
    <section className="relative">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer rounded-2xl">
          <label
            htmlFor="multiple_files"
            className="flex flex-col items-center justify-center cursor-pointers">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            {/* <input id="multiple_files" type="file" multiple className="hidden" /> */}
          </label>
        </div>
      </div>
      <div className="mt-24">
        {files.map((fileWrapper, index) => (
          <div key={index}>
            {fileWrapper.errors.length ? (
              <UploadError
                errors={fileWrapper.errors}
                file={fileWrapper.file}
                onDelete={onDelete}
              />
            ) : (
              <SingleFileUploadWithProgress
                onDelete={onDelete}
                onUpload={onUpload}
                file={fileWrapper.file}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default MultipleFileUploadFields
