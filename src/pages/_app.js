import Head from 'next/head'
import Script from 'next/script'
import { RendererProvider } from 'react-fela'
import CardsProvider from '~/components/CardsProvider'
import CollectionProvider from '~/components/CollectionProvider'
import ErrorBoundary from '~/components/ErrorBoundary'
import NotificationProvider from '~/components/NotificationProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'
import ImageSupportProvider from '~/components/ImageSupportProvider'
import createFelaRenderer from '~/helpers/createFelaRenderer'

const fallbackRenderer = createFelaRenderer()

export function reportWebVitals(metric) {
  const VERCEL_ENV = process.env.VERCEL_ENV || 'development'
  const IS_DEV = VERCEL_ENV === 'development'
  const WITH_WEB_VITALS = Boolean(Number(process.env.NEXT_PUBLIC_WV))

  if (IS_DEV && WITH_WEB_VITALS && metric.label === 'web-vital') {
    console.log(metric)
  }
}

function App({ Component, pageProps, renderer = fallbackRenderer }) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
        <link rel='apple-touch-icon' href='/favicon.png' />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#101F26' />
        <link rel='manifest' href='/manifest.json' />

        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Stormbound-Kitty' />
        <meta name='twitter:site' content='@stormboundccg' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <RendererProvider renderer={renderer}>
        <ErrorBoundary>
          <ImageSupportProvider>
            <NotificationProvider>
              <CardsProvider cards={pageProps.cards}>
                <CollectionProvider>
                  <PersonalDecksProvider>
                    <Component {...pageProps} />
                  </PersonalDecksProvider>
                </CollectionProvider>
              </CardsProvider>
            </NotificationProvider>
          </ImageSupportProvider>
        </ErrorBoundary>
      </RendererProvider>
      <Script lazyOnload src='/focus-visible.min.js' />
    </>
  )
}

export default App
