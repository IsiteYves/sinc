import Button from '@components/shared/button'
import TextInput from '@components/shared/inputs/textInput'
import { useRequestOtpMutation } from '@store/actions/auth'
import { updateUser } from '@store/reducers/users'
import useDisplayToast from '@utils/hooks/useToast'
import { PadLock } from '@utils/images'
import { initialUserValues } from '@utils/initialValues/auth'
import routes from '@utils/routes'
import { BUTTON_STATUS } from '@utils/types/button'
import { UserSchema } from '@utils/types/user'
import { emailValidationSchema } from '@utils/validations/auth'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

const ForgotPassword: FC = () => {
  const [requestOtp, { isLoading }] = useRequestOtpMutation()
  const { showToast } = useDisplayToast()
  const dispatch = useDispatch()
  const router = useRouter()
  const handlePress = async (values: any) => {
    values.type = 'FORGET'
    try {
      const res = await requestOtp(values).unwrap()
      const {
        data: { email },
      } = res
      initialUserValues.email = email
      const user: UserSchema = initialUserValues
      dispatch(updateUser(user))
      router.push('/reset-password')
    } catch (e: any) {
      showToast(e?.data?.message, 'error')
    }
  }
  return (
    <div className="flex items-center justify-center h-full p-10 md:p-auto">
      <motion.div className="w-full max-w-screen-sm m-auto md:w-4/6">
        <div className="flex flex-col items-center justify-center w-full mb-10">
          <Image src={PadLock} width={50} height={50} alt="padlock" />
          <div className="flex items-center text-white text-2xl my-5">
            <span>FORGOT PASSWORD?</span>
          </div>
          <div className="text-gray-200 text-center">
            We got you! Enter your valid email address below and we will send instructions on how to
            reset your <br />
            password!
          </div>
        </div>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValidationSchema}
          onSubmit={handlePress}>
          {({ errors, values, touched, handleSubmit, handleChange, setFieldValue, isValid }) => (
            <motion.div className="flex flex-col gap-5 md:w-5/6 mx-auto">
              <TextInput
                value={values.email}
                onChange={(value) => handleChange('email')(value)}
                errorMessage={(touched.email || isValid) && errors.email ? errors.email : undefined}
                placeholder="Enter your Email"
                label="Email"
              />
              <Button
                group={BUTTON_STATUS.PRIMARY}
                onClick={() => {
                  handleSubmit()
                }}
                loading={isLoading}
                disabled={isLoading}
                className="mt-5 py-3 w-1/2 mx-auto"
                type="button">
                Next
              </Button>
            </motion.div>
          )}
        </Formik>
        <div className="text-white text-center mt-5">
          <span>I already have an account ?</span>
          <button
            className="underline cursor-pointer text-[#D7B988] underline-offset-4 ml-2"
            onClick={() => {
              router.push(routes.login.url)
            }}>
            Login
          </button>
        </div>
      </motion.div>
    </div>
  )
}
export default ForgotPassword
