import React from 'react'
import { useFela } from 'react-fela'
import dynamic from 'next/dynamic'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Link from '../Link'
import useRouter from '../../hooks/useRouter'
import styles from './styles'

const SearchDialog = dynamic(() => import('../SearchDialog'))

export default React.memo(function Layout(props) {
  const router = useRouter()
  const { css } = useFela()
  const { location } = useRouter()
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  React.useEffect(() => {
    const hash = window.location.hash

    // react-router and @loadable/component are making it incredibly hard to use
    // anchor links, and I didn’t find a better solution than literally waiting
    // half a second to hope for the bundle to be fully loaded… The `:target`
    // pseudo-class still doesn’t work for content which was loaded after the
    // hash was assigned (which is the case for chunks). Also, there is this
    // webkit bug that causes the `:target` pseudo-class not to work with
    // history pushes… Anyway, that’s all garbage, and I’m kind of done with it.
    // See: https://bugs.webkit.org/show_bug.cgi?id=83490
    setTimeout(() => {
      const node = hash && document.getElementById(hash.slice(1))

      if (node && node.scrollIntoView) {
        node.scrollIntoView(true)
      } else {
        window.scrollTo(0, 0)
      }
    }, 500)
  }, [location.hash])

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
