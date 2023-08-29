import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const NotFound = () => {
  return (
    <AppLayout title="Page not Found" bannerImage={DashboardBanner}>
      Oops this page is not found
    </AppLayout>
  )
}

export default WithPrivateRoute(NotFound)
