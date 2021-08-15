import Head from 'next/head'
import { RendererProvider } from 'react-fela'
import createFelaRenderer from '../helpers/createFelaRenderer'

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
        <Component {...pageProps} />
      </RendererProvider>
    </>
  )
}

export default App
