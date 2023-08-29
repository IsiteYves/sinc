import OverviewComponent from '@components/overview'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'
import routes from '@utils/routes'
import React from 'react'

const AnalyticsPage = () => {
  return (
    <AppLayout title={routes.analytics.label} bannerImage={DashboardBanner}>
      <OverviewComponent />
    </AppLayout>
  )
}

export default AnalyticsPage
