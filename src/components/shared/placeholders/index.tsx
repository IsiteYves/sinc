import { User } from 'phosphor-react'
import { FC } from 'react'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export const ProfilePlaceHolder: FC<Props> = ({ size = 'sm' }) => {
  let sizeClass

  if (size === 'sm') {
    sizeClass = 'w-8 h-8'
  }
  if (size === 'md') {
    sizeClass = 'w-10 h-10'
  }
  if (size === 'lg') {
    sizeClass = 'w-14 h-14'
  }

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClass} rounded-full bg-secondary border border-gray-500`}>
      <User color="white" className="text-gray-500" />
    </div>
  )
}
