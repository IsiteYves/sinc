import { LogoPrimaryRounded } from '@components/logo'
import { ClipLoader } from 'react-spinners'

const PageLoader = () => {
  return (
    <div className="w-screen h-screen bg-secondary flex flex-col gap-4 items-center justify-center">
      <LogoPrimaryRounded />
      <ClipLoader color="white" loading={true} size={18} />
    </div>
  )
}

export default PageLoader
