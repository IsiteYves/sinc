/* eslint-disable react/display-name */
import { RootState } from '@store/index'
import { TOKEN_NAME } from '@utils/constants'
import routes from '@utils/routes'
import { getStorageData } from '@utils/storage'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const WithPublicRoute = (Wrapped: any) => {
  return (props: any) => {
    return <Wrapped {...props} />
  }
}

export default WithPublicRoute
