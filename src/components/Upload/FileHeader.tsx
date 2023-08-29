import { X, VideoCamera } from 'phosphor-react'
import React from 'react'

export interface FileHeaderProps {
  file: File
  onDelete: (file: File) => void
  progress?: number
}

export const FileHeader = ({ file, onDelete, progress }: FileHeaderProps) => {
  return (
    <div className="container flex items-center justify-between">
      <div className="flex gap-3 ">
        <div className="p-2 bg-camera rounded-2xl">
          <VideoCamera size={24} weight="fill" color="#9E9E9E" />
        </div>
        <span className="mt-1">{file.name}</span>
        {/* <span>{file.size}MB</span> */}
      </div>
      <div className="flex gap-5">
        <span>{progress} %</span>
        <button className="" onClick={() => onDelete(file)}>
          <X size={24} weight="bold" color="#6F6F6F" />
        </button>
      </div>
    </div>
  )
}
