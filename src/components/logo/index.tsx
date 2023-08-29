import { FC } from 'react'
import Image from 'next/image'
import { LogoPrimaryWithBg, SincLogo } from '@utils/images'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}
export const Logo: FC<Props> = ({ className }) => {
  const router = useRouter()

  return (
    <div className="relative w-8 h-8">
      <Image
        src={SincLogo}
        alt={'Picture of the author'}
        fill
        onClick={() => router.push('/')}
        className={`object-contain rounded-md cursor-pointer ${className}`}
      />
    </div>
  )
}

export const LogoPrimaryRounded: FC = () => {
  const router = useRouter()

  return (
    <div className="relative w-14 h-14">
      <Image
        src={LogoPrimaryWithBg}
        alt={'Picture of the author'}
        fill
        onClick={() => router.push('/')}
        className="object-contain rounded-md cursor-pointer"
      />
    </div>
  )
}
