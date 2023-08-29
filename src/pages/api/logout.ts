import { TOKEN_NAME } from '@utils/constants'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const login = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(TOKEN_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    }),
  )
  res.statusCode = 200
  res.json({ success: true, message: 'Logged out successfully' })
}

export default login
