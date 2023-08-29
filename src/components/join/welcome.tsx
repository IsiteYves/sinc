import { Logo } from '@components/logo'
import Button from '@components/shared/button'
import { BUTTON_STATUS } from '@utils/types/button'
import { Info } from 'phosphor-react'
import React from 'react'
import Link from 'next/link'
import routes from '@utils/routes'
import { useRouter } from 'next/router'

const WelcomeComponent = () => {
  const router = useRouter()
  return (
    <div className="font-semibold bg-secondary w-fit mx-auto py-16 md:py-24 md:px-52 text-white flex flex-col justify-center items-center gap-8">
      <div className="flex gap-3 items-center justify-center">
        <Logo />
        <h1 className="text-2xl font-normal">WELCOME TO SINC</h1>
        <Logo className="" />
      </div>
      <div className="w-[26rem] text-center">
        Your organizer portal signup has automatically created an organization in your name. Get
        ready to streamline your events and collaborations effortlessly.
      </div>
      <div className="flex gap-4 items-center">
        <Info size={32} weight="fill" />
        <p>You can change the organization name letter!</p>
      </div>
      <div>
        <Button
          onClick={() => router.push(routes.pricing.url)}
          group={BUTTON_STATUS.UNIVERSITY}
          className="w-32 text-white">
          Next
        </Button>
      </div>
    </div>
  )
}

export default WelcomeComponent
