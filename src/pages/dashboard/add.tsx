import CreateEventComponent from '@components/CreateEvent/AddEvent'
import WithPrivateRoute from '@components/shared/routeWrappers/withPrivateRoute'
import AppLayout from '@layout/app'
import { DashboardBanner } from '@utils/images'

const AddNew = () => {
  return (
    <AppLayout title="Add" bannerImage={DashboardBanner}>
      <CreateEventComponent />
    </AppLayout>
  )
}
export default WithPrivateRoute(AddNew)
