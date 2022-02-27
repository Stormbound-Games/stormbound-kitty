import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import EyeCatcher from '~/components/EyeCatcher'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Link from '~/components/Link'
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
    <div className={css(styles.layout)}>
      <EyeCatcher id='082021'>
        {setIsVisible => (
          <>
            Hello! ✨ If you like Stormbound-Kitty, I could use{' '}
            <Link to='/about' onClick={() => setIsVisible(false)}>
              your help
            </Link>{' '}
            with the site if you’d like to contribute (financially or
            otherwise)!
          </>
        )}
      </EyeCatcher>
      <Header
        navigation={props.navigation}
        active={props.active}
        openSearch={() => searchDialog.current.show()}
      />

      <main className={css(styles.body)}>
        {router.isFallback ? <Loader /> : props.children}
      </main>

      <Footer />

      <SearchDialog dialogRef={searchDialog} />
    </div>
  )
})
