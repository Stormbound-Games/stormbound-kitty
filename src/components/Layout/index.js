import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import EyeCatcher from '~/components/EyeCatcher'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Link from '~/components/Link'
import Loader from '~/components/Loader'
import UpgradeNotification from '~/components/UpgradeNotification'
import styles from './styles'

const SearchDialog = dynamic(() => import('~/components/SearchDialog'))

const useServiceWorkerUpdate = () => {
  console.log('useServiceWorkerUpdate')
  const isNotInitialPass = React.useRef(null)
  const [shouldShowUpgrade, setShouldShowUpgrade] = React.useState(false)

  React.useEffect(() => {
    if (!shouldShowUpgrade && isNotInitialPass.current) {
      console.log('Setting up controlling listener')
      const wb = window.workbox
      wb.addEventListener('controlling', () => window.location.reload())
      console.log('messageSkipWaiting')
      wb.messageSkipWaiting()
    }
  }, [shouldShowUpgrade])

  React.useEffect(() => {
    const wb = window.workbox
    isNotInitialPass.current = true

    if ('serviceWorker' in navigator && wb) {
      console.log('Setting up waiting listener')
      wb.addEventListener('waiting', () => setShouldShowUpgrade(true))
      wb.register()
    }
  }, [])

  const upgrade = React.useCallback(() => setShouldShowUpgrade(false), [])

  return [shouldShowUpgrade, upgrade]
}

export default React.memo(function Layout(props) {
  const router = useRouter()
  const { css } = useFela()
  const searchDialog = React.useRef(null)
  const [shouldShowUpgrade, upgrade] = useServiceWorkerUpdate()

  return (
    <div className={css(styles.layout)}>
      {shouldShowUpgrade ? (
        <UpgradeNotification upgrade={upgrade} />
      ) : (
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
      )}
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
