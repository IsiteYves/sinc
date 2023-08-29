import React from 'react'
import UserComponent from '@components/users'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'
import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'

const UsersPage = () => (
  <AppLayout title="Users" bannerImage={DashboardBanner}>
    <UserComponent />
  </AppLayout>
)

export default WithPrivateRoute(UsersPage)
