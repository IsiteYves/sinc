import CreateEvent from '@components/Events/index'
import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const EventComponent = () => {
  return (
    <AppLayout title="Events" bannerImage={DashboardBanner}>
      <CreateEvent />
    </AppLayout>
  )
}
export default EventComponent
