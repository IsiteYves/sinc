import { AccountType } from './types/accountType'
import { Account_Types_Enums as AccountEnums } from './types/global'

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET
const TOKEN_NAME = 'sinc_token'
const PERSIST_KEY = 'sinc'
const UPLOAD_PREFIX = 'https://api-staging.sinc.today//file/'

const IS_NEW_USER_GOOGLE = 'sinc_isnewUser_google'

const USER_NOT_VERIFIED_MESSAGE = 'User is not verified'

const USER_NOT_EXIST = 'user with this username does not exist'

const BLUR_HUSH = 'L1681|4:00~pMIS4N{$%00xu_2E1'

const Account_Types: AccountType[] = [
  {
    label: 'Personal Account',
    icon: 'user',
    value: AccountEnums.PERSONAL,
  },
  {
    label: 'Business Account',
    icon: 'suitcase',
    value: AccountEnums.BUSINESS,
  },
]

export {
  Account_Types,
  BASE_API_URL,
  TOKEN_NAME,
  USER_NOT_VERIFIED_MESSAGE,
  USER_NOT_EXIST,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PERSIST_KEY,
  UPLOAD_PREFIX,
  IS_NEW_USER_GOOGLE,
  JWT_SECRET,
  BLUR_HUSH,
}
