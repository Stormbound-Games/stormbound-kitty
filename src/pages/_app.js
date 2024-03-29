import React from 'react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { RendererProvider } from 'react-fela'
import CardsProvider from '#components/CardsProvider'
import CollectionProvider from '#components/CollectionProvider'
import PersonalDecksProvider from '#components/PersonalDecksProvider'
import ErrorBoundary from '#components/ErrorBoundary'
import Layout from '#components/Layout'
import NotificationProvider from '#components/NotificationProvider'
import createFelaRenderer from '#helpers/createFelaRenderer'
import Sprite from '../components/Sprite/sprite.svg'

const fallbackRenderer = createFelaRenderer()

export function reportWebVitals(metric) {
  const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'
  const IS_DEV = VERCEL_ENV === 'development'
  const WITH_WEB_VITALS = Boolean(Number(process.env.NEXT_PUBLIC_WV))

  if (IS_DEV && WITH_WEB_VITALS && metric.label === 'web-vital') {
    console.log(metric)
  }
}

function App({ Component, pageProps, renderer = fallbackRenderer }) {
  const { settings: _settings, breadcrumbs, ...componentProps } = pageProps
  const { cards, ...settings } = _settings

  React.useEffect(() => {
    // Once the app has mounted, assign a specific property on the window object
    // that Cypress will check as part of the visit/relod commands.
    // See: https://glebbahmutov.com/blog/app-loaded/
    if (window.Cypress) {
      window.__cypress_ready = true
    }
  }, [])

  return (
    <>
      <Head>
        <link rel='preconnect' href='https://cdn.sanity.io' />
        <link rel='dns-prefetch' href='https://cdn.sanity.io' />

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
      <Sprite />

      <RendererProvider renderer={renderer}>
        <ErrorBoundary>
          <NotificationProvider>
            <CardsProvider cards={cards}>
              <CollectionProvider>
                <PersonalDecksProvider>
                  <Layout active={breadcrumbs || []} settings={settings}>
                    <Component {...componentProps} />
                  </Layout>
                </PersonalDecksProvider>
              </CollectionProvider>
            </CardsProvider>
          </NotificationProvider>
        </ErrorBoundary>
      </RendererProvider>

      <Analytics />

      <Script lazyOnload src='/focus-visible.min.js' />
    </>
  )
}

export default App
