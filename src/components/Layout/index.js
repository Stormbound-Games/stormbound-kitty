import React from 'react'
import { useFela } from 'react-fela'
import dynamic from 'next/dynamic'
import EyeCatcher from '~/components/EyeCatcher'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Link from '~/components/Link'
import styles from './styles'

const SearchDialog = dynamic(() => import('~/components/SearchDialog'))

export default React.memo(function Layout(props) {
  const { css } = useFela()
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  return (
    <div className={css(styles.layout)}>
      <EyeCatcher id='052021'>
        Stormbound-Kitty has been a 100% free (no ads, no paywall) one-person
        project for over 2 years now. <Link to='/about'>Consider helping</Link>!
      </EyeCatcher>
      <Header
        active={props.active}
        isSearchReady={isSearchReady}
        openSearch={() => searchDialog.current.show()}
      />

      <main className={css(styles.body)}>{props.children}</main>

      <Footer />

      <SearchDialog
        dialogRef={searchDialog}
        setIsSearchReady={setIsSearchReady}
      />
    </div>
  )
})
