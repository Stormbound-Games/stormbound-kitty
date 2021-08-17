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
  const description =
    'Stormbound-Kitty aims at providing tools and information about Sheepyard’s great game, and extending its players’ experience outside the game'
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
        <title>Stormbound-Kitty</title>
        <meta name='author' content='Kitty' />
        <meta name='og:site_name' content='Stormbound-Kitty' />
        <meta name='og:type' content='website' />
        <meta name='og:title' content='Stormbound-Kitty' />
        <meta name='twitter:title' content='Stormbound-Kitty' />
        <meta name='og:url' content='https://stormbound-kitty.com' />
        <meta property='og:image' content='/favicon.png' />
        <meta name='description' content={description} />
        <meta name='og:description' content={description} />
        <meta name='twitter:description' content={description} />
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
    </>
  )
}

export default App
