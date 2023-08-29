import { FC } from 'react'
import { motion } from 'framer-motion'
import { BearLayout } from '@utils/types/appLayout'
import { base } from '@utils/images'
import { Logo } from '@components/logo'
import Image from 'next/image'
import Link from 'next/link'

const BearLayout: FC<BearLayout> = ({ children }) => {
  return (
    <div className="relative flex flex-col-reverse min-h-screen lg:flex-row">
      <motion.div className="relative justify-center flex-1 md:flex">
        <Image src={base} alt="image" layout="fill" objectFit="cover" priority className="w-full" />
        <div className="max-w-screen-lg w-11/12 lg:w-[100%] m-auto relative">
          <div className="flex items-center justify-center pt-10">
            <Logo />
            <span className="text-lg font-semibold text-center text-white lg:text-3xl">Sinc</span>
          </div>
          <div className="flex flex-col py-4 md:justify-center md:items-center">
            <span className="flex items-center justify-center my-4 font-medium text-white lg:text-3xl text-md">
              DASHBOARD
            </span>
            <span className="text-md text-white text-center lg:w-[550px] mt-4 md:text-md md:w-[430px] min-[320px]:mb-20 min-[375px]:mb-24 ">
              is simply dummy text of the printing and types has been the industry`s standard Want
              to learn more about us visit our
              <Link href="https://www.sinc.today" passHref>
                <span className="text-[#D7B988] underline px-1">landing page!</span>
              </Link>
            </span>
          </div>
        </div>
      </motion.div>
      <div className="flex-1 bg-secondary">{children}</div>
    </div>
  )
}

export default BearLayout
