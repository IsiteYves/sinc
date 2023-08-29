import Button from '@components/shared/button'
import TextInput from '@components/shared/inputs/textInput'
import { useGoogleLogin } from '@react-oauth/google'
import { useGoogleCallBackMutation, useLoginMutation } from '@store/actions/auth'
import { setToken, setVerifyEmail, updateUser } from '@store/reducers/users'
import { IS_NEW_USER_GOOGLE, TOKEN_NAME } from '@utils/constants'
import useDisplayToast from '@utils/hooks/useToast'
import { google } from '@utils/images'
import { loginInitialValues } from '@utils/initialValues/auth'
import routes from '@utils/routes'
import { AuthResponse, LoginPayload } from '@utils/types/auth'
import { BUTTON_STATUS } from '@utils/types/button'
import { loginValidationSchema } from '@utils/validations/auth'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

const Login: FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const { showToast } = useDisplayToast()
  const dispatch = useDispatch()
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
        router.push('/join')
      } else {
        router.push(routes.analytics.url)
      }
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

  const handleLogin = async (values: LoginPayload) => {
    login(values)
      .unwrap()
      .then((res) => {
        handleAuthRedirect(res)
      })
      .catch((e) => {
        if (e?.data?.message === 'User is not verified') {
          dispatch(setVerifyEmail(e?.data?.data?.email))
          router.push(`${routes.verify.url}`)
        } else {
          showToast(e?.data?.message, 'error')
        }
      })
  }

  return (
    <motion.div className="w-full max-w-screen-sm m-auto md:w-1/2">
      <div className="flex flex-col items-center justify-center w-full mb-10">
        <span className="text-3xl font-medium text-white">LOGIN</span>
      </div>

      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}>
        {({ errors, values, handleChange, handleSubmit, isValid }) => (
          <motion.div className="flex flex-col gap-5">
            <TextInput
              placeholder="Enter your username"
              label="Username "
              value={values.username}
              onChange={(value) => handleChange('username')(value)}
              errorMessage={errors.username}
            />

            <TextInput
              value={values.password}
              onChange={(value) => handleChange('password')(value)}
              errorMessage={errors.password}
              placeholder="Enter your Password"
              label="Password"
              type="password"
            />
            <div className="flex flex-col items-center justify-center mt-5">
              <Button
                group={BUTTON_STATUS.PRIMARY}
                loading={isLoading || callBackLoading}
                disabled={!isValid || isLoading || callBackLoading}
                className="w-1/3 py-3 rounded-full min-[320px]:w-1/2"
                type="button"
                onClick={() => handleSubmit()}>
                LOG IN
              </Button>

              <Link href={routes.forgotPassword.url}>
                <div className="text-base text-center text-primary mt-3">Forgot password?</div>
              </Link>
            </div>
            <div className="mt-2 text-primary">
              <div className="flex items-center justify-center">
                <div className="bg-primary w-32 h-[0.07rem]"></div>
                <p className="px-4">OR</p>
                <div className="bg-primary w-32 h-[0.07rem]"></div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button onClick={() => !callBackLoading && googleLogin()}>
                  <Image src={google} alt="social" />
                </button>
              </div>
              <div className="text-white">
                <div className="flex items-center justify-center gap-2 mt-4">
                  <p>I don’t have an account?</p>
                  <button
                    className="underline cursor-pointer text-[#D7B988] underline-offset-4"
                    onClick={() => {
                      router.push(routes.signup.url)
                    }}>
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Formik>
    </motion.div>
  )
}

export default Login
