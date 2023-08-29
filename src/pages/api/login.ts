import { TOKEN_NAME } from '@utils/constants'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const login = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(TOKEN_NAME, req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 60,
      sameSite: 'strict',
      path: '/',
    }),
  )
  res.statusCode = 200
  res.json({ success: true, message: 'Token cookie saved successfully!' })
}

export default login
