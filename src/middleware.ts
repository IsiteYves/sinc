import { TOKEN_NAME } from '@utils/constants'
import routes from '@utils/routes'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // get cookie token
  const hasToken = req.cookies.get(TOKEN_NAME)

  // protected routes (admin routes)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (hasToken) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL(routes.login.url, req.url))
    }
  }

  // login & register routes
  if ([routes.login.url, routes.signup.url].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL(routes.analytics.url, req.url))
    } else {
      return NextResponse.next()
    }
  }
}
