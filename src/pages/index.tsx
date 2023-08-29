import AuthComponent from '@components/auth/login'
import { footerData } from '@utils/footerData'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import AuthLayout from 'src/layouts/auth'

const Login = () => {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col items-center justify-center h-full p-10 md:p-auto">
          <AuthComponent />
          <div className="flex items-center justify-center lg:gap-4  text-[#525252] bottom-0 min-[320px]:flex-col min-[320px]:mt-4 md:flex-row md:gap-4">
            {footerData.map((item) => (
              <div key={item.name}>
                <Link href={item.url}>
                  <p className="cursor-pointer ">{item.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </Fragment>
  )
}

export default Login
