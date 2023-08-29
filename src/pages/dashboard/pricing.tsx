import React from 'react'
import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'
import Pricing from '@components/pricing'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const OverviewPage = () => {
  return (
    <AppLayout title="Pricing" bannerImage={DashboardBanner}>
      <Pricing />
    </AppLayout>
  )
}

export default WithPrivateRoute(OverviewPage)
