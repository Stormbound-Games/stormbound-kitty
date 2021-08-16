import Head from 'next/head'
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
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
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
    </>
  )
}

export default App
