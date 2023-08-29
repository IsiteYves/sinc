import Button from '@components/shared/button'
import OtpInput from '@components/shared/inputs/otpInput'
import TextInput from '@components/shared/inputs/textInput'
import { useResetPasswordMutation } from '@store/actions/auth'
import { RootState } from '@store/index'
import useDisplayToast from '@utils/hooks/useToast'
import { envelope, padLock1 } from '@utils/images'
import routes from '@utils/routes'
import { BUTTON_STATUS } from '@utils/types/button'
import { resetPasswordValidationSchema } from '@utils/validations/auth'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  otp: string
  setIsOtp: (isOtp: boolean) => void
  setOtp: (otp: string) => void
}
const ResetCode: FC<Props> = ({ setIsOtp, setOtp, otp }) => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  return (
    <motion.div className="w-full max-w-screen-sm m-auto md:w-2/3">
      <div className="flex flex-col items-center justify-center w-full gap-10 mb-10">
        <Image src={envelope} alt={'image'} />
        <div className="flex flex-col items-center justify-center gap-5">
          <span className="text-2xl font-medium text-center text-white">RESET CODE</span>
          <p className="text-white text-center w-[400px] min-[320px]:w-[380px]">
            Enter the code sent to <span className="text-[#FFD48F]">{user?.email}</span> in the
            input below to reset your password!{' '}
            <Link href="/forgot-password" className="text-[#FFD48F]">
              Wrong email?
            </Link>
          </p>
        </div>
      </div>
      <motion.div className="flex flex-col -mt-5 items-center justify-center gap-5">
        <OtpInput setOtp={setOtp} otp={otp} />
        <div className="flex flex-col items-center justify-center">
          <Button
            group={BUTTON_STATUS.PRIMARY}
            type="submit"
            onClick={() => {
              setIsOtp(false)
            }}
            // loading={loading ? true : undefined}
            className="py-4 rounded-full w-[168px]">
            CONFIRM
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ResetPasswordComponent = () => {
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const [isOtp, setIsOtp] = useState(true)
  const { showToast } = useDisplayToast()
  const [resetPassword] = useResetPasswordMutation()

  const handleReset = async (values: any) => {
    setLoading(true)
    const { password, confirmPassword } = values
    const token = otp
    const payload: any = { password, confirmPassword, token }

    try {
      const res = await resetPassword(payload).unwrap()
      const { message } = res
      showToast(message)
      router.push('/')
    } catch (e: any) {
      showToast(e?.data?.message, 'error')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 md:p-auto">
      {isOtp ? (
        <ResetCode otp={otp} setIsOtp={setIsOtp} setOtp={setOtp} />
      ) : (
        <motion.div className="w-full max-w-screen-sm m-auto md:w-4/6">
          <div className="flex flex-col items-center justify-center w-full mb-10">
            <Image src={padLock1} width={50} height={50} alt="padlock" />
            <div className="flex items-center text-white text-2xl my-5">
              <span className="font-semibold">New Password!</span>
            </div>
            <div className="text-gray-200 text-center">
              Enter your fresh new password for you account! Remember to keep it somewhere safe!
            </div>
          </div>

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={handleReset}>
            {({ errors, values, touched, handleSubmit, handleChange, setFieldValue, isValid }) => (
              <motion.div className="flex flex-col mx-auto gap-5 md:w-4/5">
                <TextInput
                  value={values.password}
                  onChange={(value) => handleChange('password')(value)}
                  errorMessage={errors.password}
                  placeholder="Enter your Password"
                  label="Password"
                  type="password"
                />
                <TextInput
                  value={values.confirmPassword}
                  onChange={(value) => handleChange('confirmPassword')(value)}
                  errorMessage={errors.confirmPassword}
                  placeholder="Confirm your Password"
                  label="Confirm Password"
                  type="password"
                />
                <Button
                  group={BUTTON_STATUS.PRIMARY}
                  onClick={() => {
                    handleSubmit()
                  }}
                  loading={loading}
                  disabled={loading}
                  className="mt-5 py-3 w-1/2 mx-auto"
                  type="button">
                  Reset
                </Button>
              </motion.div>
            )}
          </Formik>
        </motion.div>
      )}
      <div className="text-white">
        <div className="flex justify-center gap-2 mt-4">
          <p>I already have an account ?</p>
          <button
            className="underline cursor-pointer text-[#D7B988] underline-offset-4"
            onClick={() => router.push(routes.login.url)}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
export default ResetPasswordComponent
