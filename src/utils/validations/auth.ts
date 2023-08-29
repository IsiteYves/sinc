import * as Yup from 'yup'

export const loginValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  email: Yup.string().required('Email is required').email('Enter a valid email'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?])(?=.*[0-9]).+$/,
      'Must include atleast uppercase letter, number and a special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

export const emailValidationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Enter a valid email'),
})

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?])(?=.*[0-9]).+$/,
      'Must include atleast uppercase letter, number and a special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})
