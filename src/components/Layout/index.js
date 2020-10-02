import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import load from '../../helpers/load'
import './index.css'

const SearchDialog = load('SearchDialog')

export default React.memo(function Layout(props) {
  const { pathname } = useLocation()
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  React.useLayoutEffect(() => {
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
  }, [pathname])

  return (
    <div className='Layout'>
      <EyeCatcher id='patch-2020-10'>
        The second major Sheepyard release is landing with new content.{' '}
        <Link to='/changelog/10-2020'>Be sure to check it out</Link>!
      </EyeCatcher>

      <Header
        active={props.active}
        isSearchReady={isSearchReady}
        openSearch={() => searchDialog.current.show()}
      />

      <main className='Layout__body'>{props.children}</main>

      <Footer />

      <SearchDialog
        dialogRef={searchDialog}
        setIsSearchReady={setIsSearchReady}
      />
    </div>
  )
})
