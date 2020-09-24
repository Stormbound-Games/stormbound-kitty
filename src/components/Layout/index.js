import React from 'react'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Only from '../Only'
import load from '../../helpers/load'
import './index.css'

const SearchDialog = load('SearchDialog')

export default React.memo(function Layout(props) {
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  return (
    <div className='Layout'>
      <Only.Desktop>
        <EyeCatcher id='patch-2020-09-2'>
          Please kindly take a minute to fill{' '}
          <a
            href='https://forms.gle/6jnwGJZLo22pWwFdA'
            target='_blank'
            rel='noopener noreferrer'
          >
            a short survey about Stormbound-Kitty
          </a>
          !
        </EyeCatcher>
      </Only.Desktop>

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
