import NotificationsSelector from '@components/NotificationSelector'
import ProfileSelector from '@components/ProfileSelector'
import TextInput from '@components/shared/inputs/textInput'
import SwitchOrganization from '@components/switchOrganization'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MagnifyingGlass } from 'phosphor-react'
import { FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

const Header: FC<{ title: string }> = ({ title }) => {
  const { pathname } = useRouter()

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-full m-auto max-w-screen-2xl py-page sticky top-0 z-20 bg-[#121212]">
        <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-2 pr-[120px] pl-[10px] md:px-page">
          <div className="text-2xl font-semibold  text-primary capitalize hidden md:flex ">
            {title}
          </div>
          <div className="w-32 px-4 text-white backdrop-blur-sm md:w-full">
            <TextInput
              placeholder="Search"
              className="text-sm"
              icon={
                <MagnifyingGlass size={20} weight="fill" className="inline pt-1 text-gray-300" />
              }
            />
          </div>
          <SwitchOrganization />
          <div className="flex items-center justify-end gap-2 ml-56 md:ml-0">
            <NotificationsSelector />
            <ProfileSelector />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
