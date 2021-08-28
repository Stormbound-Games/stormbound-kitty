import React from 'react'

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

export default useServiceWorkerUpdate
