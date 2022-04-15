import Head from 'next/head'
import PlausibleProvider from 'next-plausible'
import Script from 'next/script'
import { RendererProvider } from 'react-fela'
import CardsProvider from '~/components/CardsProvider'
import CollectionProvider from '~/components/CollectionProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'
import ErrorBoundary from '~/components/ErrorBoundary'
import Layout from '~/components/Layout'
import NotificationProvider from '~/components/NotificationProvider'
import createFelaRenderer from '~/helpers/createFelaRenderer'

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

  return (
    <>
      <Head>
        <link rel='preconnect' href='https://cdn.sanity.io' />

        <link
          rel='shortcut icon'
          href='https://cdn.sanity.io/images/5hlpazgd/production/87e0bf6ba32d6c2700343a69c93ca7be97005760-512x512.png?auto=format&w=256&h=256&q=90'
        />
        <link
          rel='apple-touch-icon'
          href='https://cdn.sanity.io/images/5hlpazgd/production/87e0bf6ba32d6c2700343a69c93ca7be97005760-512x512.png?auto=format&w=256&h=256&q=90'
        />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#101F26' />
        <link rel='manifest' href='/manifest.json' />

        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Stormbound-Kitty' />
        <meta name='twitter:site' content='@stormboundccg' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <PlausibleProvider
        domain='stormbound-kitty.com'
        enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'}
        exclude={[
          '/calculators/value/*',
          // A single star (*) is non-greedy, which means it will take anything
          // until the next slash (/). Therefore, this path should exclude card
          // builder paths, without excluding official pages, since they are
          // formatted as `/card/official/*`. It will exclude anything starting
          // with `/card` and expressed over a single URL portion though (e.g.
          // `/card/stats`).
          '/card/*',
          '/card/*/display',
          // Ignore the whole deck builder and list builder and all their sub
          // paths but the root/blank URL.
          '/deck/**',
          '/list/**',
          '/quest/*',
          '/simulators/battle/**',
          '/simulators/books/*',
          '/simulators/draft/*',
          // Plausible expects a comma-separated list of paths, and
          // next-plausible only proxies the value without changing it.
        ].join(',')}
      >
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
      </PlausibleProvider>

      <Script lazyOnload src='/focus-visible.min.js' />
    </>
  )
}

export default App
