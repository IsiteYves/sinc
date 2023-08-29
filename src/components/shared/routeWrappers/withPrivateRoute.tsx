/* eslint-disable react/display-name */
import { RootState } from '@store/index'
import { logout, setToken } from '@store/reducers/users'
import { TOKEN_NAME } from '@utils/constants'
import routes from '@utils/routes'
import { getStorageData } from '@utils/storage'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const WithPrivateRoute = (Wrapped: any) => {
  return (props: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { token } = useSelector((state: RootState) => state.userReducer)

    const localToken = getStorageData(TOKEN_NAME)

    if (!token && localToken) dispatch(setToken(localToken))

    if (!token && !localToken) {
      dispatch(logout())
      router.replace(routes.login.url)
      return null
    }

    return <Wrapped {...props} />
  }
}

export default WithPrivateRoute
