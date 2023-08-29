import { AppLayout } from '@utils/types/appLayout'
import { FC } from 'react'
import Header from './header'
import SideBar from './sideBar'

const AppLayout: FC<AppLayout> = ({ children, bannerImage, title }) => {
  return (
    <div className="flex w-screen bg-[#121212]">
      <SideBar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Header title={title} />
        <div className="relative  text-white max-w-screen-2xl 2xl:m-auto -top-50">{children}</div>
      </div>
    </div>
  )
}

export default AppLayout
