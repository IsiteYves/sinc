import Button from '@components/shared/button'
import OtpInput from '@components/shared/inputs/otpInput'
import { useRequestOtpMutation, useVerifyOtpMutation } from '@store/actions/otp'
import { RootState } from '@store/index'
import { setToken, updateUser } from '@store/reducers/users'
import useDisplayToast from '@utils/hooks/useToast'
import { envelope } from '@utils/images'
import routes from '@utils/routes'
import { BUTTON_STATUS } from '@utils/types/button'
import { IOTP_ENUMS } from '@utils/types/otp'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

const VerifyComponent = () => {
  const router = useRouter()
  const { user, verifyEmail } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch()
  const [otp, setOtp] = useState('')
  const { showToast } = useDisplayToast()
  const [verifyUser, { isLoading }] = useVerifyOtpMutation()

  const [requestOtp, { isLoading: requestOtpLoading }] = useRequestOtpMutation()

  const handleRequestAnotherOtp = async () => {
    if (verifyEmail) {
      try {
        const { message } = await requestOtp({
          email: verifyEmail,
          type: IOTP_ENUMS.VERIFICATION,
        }).unwrap()
        showToast(message, 'success')
      } catch (e: any) {
        showToast(e?.data?.message, 'error')
      }
    }
  }

  const handleVerify = async () => {
    try {
      const res = await verifyUser(otp).unwrap()
      const {
        data: { user, token },
      } = res
      await fetch(routes.serverLogin.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      dispatch(setToken(token))
      dispatch(updateUser(user))
      router.push(routes.welcome.url)
    } catch (e: any) {
      showToast(e?.data?.message, 'error')
    }
  }

  if (!verifyEmail) {
    router.push(routes.login.url)
    return null
  }

  return (
    <div className="flex items-center justify-center h-full p-10 md:p-auto">
      <motion.div className="w-full max-w-screen-sm m-auto md:w-1/2">
        <div className="flex flex-col items-center justify-center w-full gap-10 mb-10">
          <Image src={envelope} alt={'image'} />
          <div className="flex flex-col items-center justify-center gap-5">
            <span className="text-2xl font-medium text-center text-white">
              VERIFY YOUR ACCOUNT!
            </span>
            <p className="text-white text-center w-[380px] min-[320px]:w-[280px]">
              Enter the code that was sent to <span className="text-[#FFD48F]">{verifyEmail}</span>{' '}
              in the input below to verify your email!
            </p>
          </div>
        </div>
        <motion.div className="flex flex-col items-center justify-center gap-5">
          <OtpInput setOtp={setOtp} otp={otp} />
          <div className="flex flex-col items-center justify-center">
            <Button
              group={BUTTON_STATUS.PRIMARY}
              type="submit"
              onClick={() => {
                handleVerify()
              }}
              loading={isLoading}
              disabled={isLoading}
              className="py-4 rounded-full w-[168px]">
              VERIFY
            </Button>
            {requestOtpLoading ? (
              <ClipLoader className="mt-4" color="#F09F1B" size={25} />
            ) : (
              <button
                className=" cursor-pointer text-[#D7B988] mt-4 hover:underline"
                onClick={handleRequestAnotherOtp}>
                Resend code
              </button>
            )}

            <div className="text-white">
              <div className="flex gap-2 mt-4">
                <p>I already have an account ?</p>
                <button
                  className="underline cursor-pointer text-[#D7B988] underline-offset-4"
                  onClick={() => router.push('/')}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
export default VerifyComponent
