import React from 'react'
import WelcomeComponent from '@components/join/welcome'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const WelcomePage = () => {
  return (
    <AppLayout title="Welcome" bannerImage={DashboardBanner}>
      <div className="bg-base py-28 overflow-hidden min-h-full">
        <WelcomeComponent />
      </div>
    </AppLayout>
  )
}

export default WelcomePage
