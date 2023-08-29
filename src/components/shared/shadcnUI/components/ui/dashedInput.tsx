import { cn } from '@lib/utils'
import { DownloadSimple } from 'phosphor-react'
import React, { useCallback, useRef, useState } from 'react'
import { Progress } from './progress'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    // const handleFileInputChange = async (acceptedFiles: File[]) => {
    //   setLoading(true);
    // };

    const handleFileInputClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    const handleCancelClick = () => {
      setLoading(false)
    }

    // const onDrop = useCallback((acceptedFiles) => {}, []);

    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //   onDrop,
    // });

    return (
      <div className="relative">
        <div
          // {...getRootProps()}
          className={cn('relative')}>
          <input
            type="file"
            className="hidden"
            ref={(inputRef) => {
              fileInputRef.current = inputRef
              if (ref) {
                if (typeof ref === 'function') {
                  ref(inputRef)
                } else {
                  ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef
                }
              }
            }}
            // onChange={(e) => handleFileInputChange(e.target.files)}
            // {}s
            {...props}
          />

          <div className="relative">
            <div className="absolute top-0 bottom-0 flex flex-col items-center justify-center w-full text-primary-dark">
              <div className="flex items-center justify-center p-2 rounded-full bg-secondary-dark">
                <DownloadSimple size={30} weight="bold" />
              </div>
              <div className="mt-2 text-sm font-medium">
                <button className="underline text-primary" onClick={handleFileInputClick}>
                  Click to upload
                </button>{' '}
                or drag and drop
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Videos must be less than 30MB and photos must be less than 2MB in size.
              </div>
            </div>

            {loading && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border border-gray-300 rounded-md">
                <Progress value={progress} />
                <button
                  className="px-2 py-1 text-sm text-primary hover:text-primary-dark"
                  onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
