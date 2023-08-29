import '../styles/globals.css'
import '../styles/nprogress.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '../store'
import futuraFonts from '@next/font/local'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import NProgressContainer from '@components/progressBar'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '@utils/constants'
import { PersistGate } from 'redux-persist/integration/react'

export const futura = futuraFonts({
  src: [
    { path: '../assets/fonts/futura/200.ttf', weight: '400' },
    { path: '../assets/fonts/futura/300.ttf', weight: '500' },
    { path: '../assets/fonts/futura/400.ttf', weight: '600' },
    { path: '../assets/fonts/futura/500.ttf', weight: '700' },
    { path: '../assets/fonts/futura/600.ttf', weight: '800' },
    { path: '../assets/fonts/futura/700..ttf', weight: '900' },
  ],
  display: 'block',
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={futura.className}>
      <NProgressContainer />
      <Toaster />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </main>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
