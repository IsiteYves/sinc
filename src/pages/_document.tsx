import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="Sinc" content="Sinc Organizer" />
        <meta name="description" content="Get started with all events in one place!" />
        <link rel="shortcut icon" href="/yellowIcon.svg" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sinc.today/" />
        <meta property="og:title" content="Sinc Today" />
        <meta property="og:description" content="Get started with all events in one place!" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dxyu6elli/image/upload/v1681555190/DERIVABLES_FACEBOOK_BANNER_koupyj_azplfe.jpg"
        />

        <meta property="twitter:card" content="Sinc Today" />
        <meta property="twitter:url" content="https://sinc.today/" />
        <meta property="twitter:title" content="Sinc Today" />
        <meta property="twitter:description" content="Get started with all events in one place!" />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/dxyu6elli/image/upload/v1681555190/DERIVABLES_FACEBOOK_BANNER_koupyj_azplfe.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
