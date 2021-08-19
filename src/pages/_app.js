import Head from 'next/head'
import Script from 'next/script'
import { RendererProvider } from 'react-fela'
import CollectionProvider from '~/components/CollectionProvider'
import ErrorBoundary from '~/components/ErrorBoundary'
import NotificationProvider from '~/components/NotificationProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'
import ImageSupportProvider from '~/components/ImageSupportProvider'
import UserProvider from '~/components/UserProvider'
import createFelaRenderer from '~/helpers/createFelaRenderer'

const fallbackRenderer = createFelaRenderer()

function App({ Component, pageProps, renderer = fallbackRenderer }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no'
        />
        <meta name='theme-color' content='#101F26' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='og:type' content='website' />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (!Object.values) Object.values = o => Object.keys(o).map(k => o[k])`,
          }}
        />
      </Head>
      <RendererProvider renderer={renderer}>
        <ErrorBoundary>
          <ImageSupportProvider>
            <NotificationProvider>
              <CollectionProvider>
                <PersonalDecksProvider>
                  <UserProvider>
                    <Component {...pageProps} />
                  </UserProvider>
                </PersonalDecksProvider>
              </CollectionProvider>
            </NotificationProvider>
          </ImageSupportProvider>
        </ErrorBoundary>
      </RendererProvider>
      <Script async src='/focus-visible.min.js' />
    </>
  )
}

export default App
