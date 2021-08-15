import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Link from '../Link'
import styles from './styles'

const SearchDialog = dynamic(() => import('../SearchDialog'))

export default React.memo(function Layout(props) {
  const router = useRouter()
  const { css } = useFela()
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  if (router.isFallback) return null

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
