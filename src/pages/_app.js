import Head from 'next/head'
import { RendererProvider } from 'react-fela'
import createFelaRenderer from '~/helpers/createFelaRenderer'
import CollectionProvider from '~/components/CollectionProvider'

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
        <CollectionProvider>
          <Component {...pageProps} />
        </CollectionProvider>
      </RendererProvider>
    </>
  )
}

export default App
