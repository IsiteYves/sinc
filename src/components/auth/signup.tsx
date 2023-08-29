import Button from '@components/shared/button'
import TextInput from '@components/shared/inputs/textInput'
import { useGoogleLogin } from '@react-oauth/google'
import { useGoogleCallBackMutation, useSignupMutation } from '@store/actions/auth'
import { setToken, setVerifyEmail, updateUser } from '@store/reducers/users'
import { IS_NEW_USER_GOOGLE, TOKEN_NAME } from '@utils/constants'
import useDisplayToast from '@utils/hooks/useToast'
import { google } from '@utils/images'
import { signupInitialValues } from '@utils/initialValues/auth'
import routes from '@utils/routes'
import { mediaData } from '@utils/socialMedia'
import { storeStorageData } from '@utils/storage'
import { AuthResponse, SignupPayload } from '@utils/types/auth'
import { BUTTON_STATUS } from '@utils/types/button'
import { signupValidationSchema } from '@utils/validations/auth'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'phosphor-react'
import { FC, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

const Signup: FC = () => {
  const [step, setStep] = useState<number>(1)
  const [status, setStatus] = useState<number>(0)
  const [signup, { isLoading }] = useSignupMutation()
  const dispatch = useDispatch()
  const { showToast } = useDisplayToast()
  const router = useRouter()

  const [googleauthCallBack, { isLoading: callBackLoading }] = useGoogleCallBackMutation()

  const handleAuthRedirect = async (res: AuthResponse) => {
    const {
      data: { user, token, isNewUser },
    } = res
    dispatch(setToken(token))
    dispatch(updateUser(user))
    if (isNewUser) {
      router.push(routes.usernamePrompt.url)
    } else {
      await fetch(routes.serverLogin.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      if (user.accountType !== 'business') {
        router.push(routes.join.url)
      } else {
        router.push(routes.analytics.url)
      }
    }
  }

  const handleSignup = async (values: SignupPayload) => {
    try {
      const payload = { ...values }
      delete payload.confirmPassword
      const res = await signup(payload).unwrap()
      const {
        data: { user, token },
        statusCode,
      } = res
      dispatch(setToken(token))
      dispatch(updateUser(user))
      setStatus(statusCode)
      dispatch(setVerifyEmail(user?.email))
      router.push(routes.verify.url)
    } catch (e: any) {
      showToast(e?.data?.message, 'error')
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      googleauthCallBack({ code })
        .unwrap()
        .then((res) => {
          handleAuthRedirect(res)
        })
        .catch((e) => {
          showToast(e?.data?.message, 'error')
        })
    },
    flow: 'auth-code',
  })

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  return (
    <motion.div className="w-full max-w-screen-sm m-auto md:w-1/2">
      <div className="flex flex-col items-center justify-center w-full mb-10">
        <span className="text-3xl font-medium text-white">SIGN UP</span>
      </div>
      <div className="flex items-center gap-36 pb-4 text-gray-300 mb-5 transition-all duration-150">
        {step !== 1 && <ArrowLeft size={32} onClick={handleBack} className="cursor-pointer" />}
        <p className="text-center"> Step {step} of 3 </p>
      </div>

      <Formik
        initialValues={signupInitialValues}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}>
        {({ errors, values, handleSubmit, handleChange, validateField }) => (
          <motion.div className="flex flex-col gap-5">
            {step === 1 && (
              <Fragment>
                <TextInput
                  placeholder="Enter your firstname"
                  label="First Name"
                  value={values.firstName}
                  onChange={(value) => handleChange('firstName')(value)}
                  errorMessage={errors.firstName}
                />
                <TextInput
                  placeholder="Enter your lastname"
                  label="Last Name"
                  value={values.lastName}
                  onChange={(value) => handleChange('lastName')(value)}
                  errorMessage={errors.lastName}
                />
              </Fragment>
            )}
            {step === 2 && (
              <Fragment>
                <TextInput
                  placeholder="Enter your username"
                  label="Username"
                  value={values.username}
                  onChange={(value) => handleChange('username')(value)}
                  errorMessage={errors.username}
                />
                <TextInput
                  placeholder="Enter your email"
                  label="Email"
                  value={values.email}
                  onChange={(value) => handleChange('email')(value)}
                  errorMessage={errors.email}
                />
              </Fragment>
            )}
            {step === 3 && (
              <Fragment>
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
              </Fragment>
            )}
            <Button
              group={BUTTON_STATUS.PRIMARY}
              loading={isLoading || callBackLoading}
              disabled={isLoading || callBackLoading}
              className="my-4 w-1/2 mx-auto"
              type="button"
              onClick={() => {
                if (step === 1) {
                  validateField('firstName')
                  validateField('lastName')
                  if (
                    values.firstName &&
                    values.lastName &&
                    !errors.firstName &&
                    !errors.lastName
                  ) {
                    setStep(2)
                  }
                }
                if (step === 2) {
                  validateField('username')
                  validateField('email')
                  if (values.username && values.email && !errors.username && !errors.email) {
                    setStep(3)
                  }
                }
                if (step === 3) {
                  validateField('password')
                  validateField('confirmPassword')
                  if (values.password && values.confirmPassword) {
                    handleSubmit()
                  }
                }
              }}>
              {step === 3 ? 'REGISTER' : 'NEXT'}
            </Button>
          </motion.div>
        )}
      </Formik>

      {step === 1 && (
        <div className="mt-2 text-primary">
          <div className="flex items-center justify-center my-5">
            <div className="bg-primary w-32 h-[0.07rem]"></div>
            <p className="px-4">OR</p>
            <div className="bg-primary w-32 h-[0.07rem]"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image src={google} alt="social" onClick={googleLogin} />
          </div>
        </div>
      )}
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
  )
}
export default Signup
