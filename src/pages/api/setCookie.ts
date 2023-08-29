import { TOKEN_NAME } from '@utils/constants'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const setCookie = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(req.body.name, req.body.value, {
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

export default setCookie
