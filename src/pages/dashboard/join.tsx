import React from 'react'
import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'
import UserJoinComponent from '@components/join'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const DashboardsPage = () => (
  <AppLayout title="Join" bannerImage={DashboardBanner}>
    <UserJoinComponent />
  </AppLayout>
)

export default DashboardsPage
