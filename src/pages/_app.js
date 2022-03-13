import Head from 'next/head'
import Script from 'next/script'
import { RendererProvider } from 'react-fela'
import ErrorBoundary from '~/components/ErrorBoundary'
import NotificationProvider from '~/components/NotificationProvider'
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

      <RendererProvider renderer={renderer}>
        <ErrorBoundary>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </ErrorBoundary>
      </RendererProvider>

      <Script lazyOnload src='/focus-visible.min.js' />
      <Script
        strategy='lazyOnload'
        data-domain='stormbound-kitty.com'
        src='https://plausible.io/js/plausible.js'
      />
    </>
  )
}

export default App
