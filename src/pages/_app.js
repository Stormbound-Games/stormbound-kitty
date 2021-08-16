import Head from 'next/head'
import { RendererProvider } from 'react-fela'
import createFelaRenderer from '~/helpers/createFelaRenderer'
import CollectionProvider from '~/components/CollectionProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'

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
          <PersonalDecksProvider>
            <Component {...pageProps} />
          </PersonalDecksProvider>
        </CollectionProvider>
      </RendererProvider>
    </>
  )
}

export default App
