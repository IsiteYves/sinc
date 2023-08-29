import { LogoPrimaryRounded } from '@components/logo'
import Button from '@components/shared/button'
import TextInput from '@components/shared/inputs/textInput'
import { useGoogleSignupMutation } from '@store/actions/auth'
import { RootState } from '@store/index'
import { logout, setToken, updateUser } from '@store/reducers/users'
import { IS_NEW_USER_GOOGLE, TOKEN_NAME } from '@utils/constants'
import useDisplayToast from '@utils/hooks/useToast'
import routes from '@utils/routes'
import { storeStorageData } from '@utils/storage'
import { AccountType } from '@utils/types/accountType'
import { BUTTON_STATUS } from '@utils/types/button'
import { Account_Types_Enums } from '@utils/types/global'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ArrowLeft, At, UserCirclePlus } from 'phosphor-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
})

const initialValue = {
  username: '',
  accountType: Account_Types_Enums.BUSINESS,
}
interface GoogleSignupPayload {
  username: string
  accountType: AccountType['value']
}

const UsernamePrompt = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { showToast } = useDisplayToast()
  const [googleSignup, { isLoading }] = useGoogleSignupMutation()

  const handleVerify = async (values: GoogleSignupPayload) => {
    try {
      const res = await googleSignup(values).unwrap()
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
      router.push(routes.analytics.url)
    } catch (e: any) {
      showToast(e?.data?.message, 'error')
    }
  }

  const handleGoBack = async () => {
    // dispatch(logout());
    router.back()
  }

  return (
    <div className="flex items-center justify-center h-full p-10 md:p-auto">
      <motion.div className="w-full max-w-screen-sm m-auto md:w-1/2">
        <ArrowLeft size={32} className="text-gray-200 mb-5 cursor-pointer" onClick={handleGoBack} />
        <div className="flex flex-col items-center justify-center w-full mb-10">
          <UserCirclePlus className="text-gray-200 text-6xl mb-3" />
          <div className="flex items-center text-primary text-4xl mb-3">
            <At weight="bold" />
            <span className="font-semibold">username!</span>
          </div>
          <div className="text-gray-200 text-center">
            Create your unique{' '}
            <a href="#" className="underline text-primary underline-offset-4 cursor-pointer">
              username
            </a>{' '}
            that will be used to identify your account!
          </div>
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleVerify}>
          {({ errors, values, touched, handleSubmit, handleChange, setFieldValue, isValid }) => (
            <motion.div className="flex flex-col gap-5">
              <TextInput
                value={values.username}
                onChange={(value) => handleChange('username')(value)}
                errorMessage={
                  (touched.username || isValid) && errors.username ? errors.username : undefined
                }
                placeholder="Enter your username"
                label="Username"
              />
              <Button
                group={BUTTON_STATUS.PRIMARY}
                onClick={() => {
                  handleSubmit()
                }}
                loading={isLoading}
                disabled={isLoading}
                className="mt-5 w-1/2 mx-auto"
                type="button">
                PROCEED
              </Button>
            </motion.div>
          )}
        </Formik>
      </motion.div>
    </div>
  )
}
export default UsernamePrompt
