import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import CardsProvider from '~/components/CardsProvider'
import CollectionProvider from '~/components/CollectionProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'
import EyeCatcher from '~/components/EyeCatcher'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import BlocksRenderer from '~/components/BlocksRenderer'
import Loader from '~/components/Loader'
import styles from './styles'

const SearchDialog = dynamic(() => import('~/components/SearchDialog'), {
  ssr: false,
})

export default React.memo(function Layout(props) {
  const router = useRouter()
  const { css } = useFela()
  const searchDialog = React.useRef(null)

  return (
    <CardsProvider cards={props.settings.cards}>
      <CollectionProvider>
        <PersonalDecksProvider>
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

            <SearchDialog dialogRef={searchDialog} />
          </div>
        </PersonalDecksProvider>
      </CollectionProvider>
    </CardsProvider>
  )
})
