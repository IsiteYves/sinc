import ResetPasswordComponent from '@components/auth/resetPassword'
import WithPublicRoute from '@components/shared/routeWrappers/withPublicRoute'
import { footerData } from '@utils/footerData'
import Link from 'next/link'
import React from 'react'
import AuthLayout from 'src/layouts/auth'

const ResetPasswordPage = () => (
  <AuthLayout>
    <div className="flex flex-col items-center justify-center h-full p-10 md:p-auto">
      {' '}
      <ResetPasswordComponent />
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
)

export default WithPublicRoute(ResetPasswordPage)
