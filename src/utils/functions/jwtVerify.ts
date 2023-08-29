import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@utils/constants'

export const isValidToken = (token: string): boolean => {
  if (!JWT_SECRET) return false
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
