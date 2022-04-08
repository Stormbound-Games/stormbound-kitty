import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import EyeCatcher from '~/components/EyeCatcher'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import BlocksRenderer from '~/components/BlocksRenderer'
import Loader from '~/components/Loader'
import PreviewBanner from '~/components/PreviewBanner'
import styles from './styles'

const SearchDialog = dynamic(() => import('~/components/SearchDialog'), {
  ssr: false,
})

export default React.memo(function Layout(props) {
  const router = useRouter()
  const { css } = useFela()
  const searchDialog = React.useRef(null)

  return (
    <div className={css(styles.layout)}>
      {props.settings.eyeCatcher ? (
        <EyeCatcher id={props.settings.eyeCatcher.id}>
          <BlocksRenderer value={props.settings.eyeCatcher.content} />
        </EyeCatcher>
      ) : null}
      <Header
        navigation={props.settings.navigation}
        active={props.active}
        openSearch={() => searchDialog.current.show()}
      />

      <main className={css(styles.body)}>
        {router.isFallback ? <Loader /> : props.children}
      </main>

      <Footer />

      {props.settings.isPreview && <PreviewBanner />}

      <SearchDialog dialogRef={searchDialog} />
    </div>
  )
})
