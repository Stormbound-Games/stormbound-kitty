import React from 'react'
import supportsWebp from '../../helpers/supportsWebp'

export const WebpContext = React.createContext(false)

const STORAGE_KEY = 'sk.webp'

const getStoredWebpSupport = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch (error) {
    return false
  }
}

export default function WebpProvider(props) {
  const [webp, setWebp] = React.useState(getStoredWebpSupport())

  React.useEffect(() => {
    let storedValue = null

    try {
      // `localStorage` is not defined in some Android webviews and should
      // always be safeguarded to avoid a runtime JavaScript error.
      storedValue = localStorage.getItem(STORAGE_KEY)
    } catch (error) {}

    if (storedValue === null) {
      supportsWebp().then(supports => {
        setWebp(supports)
        if (supports) document.documentElement.classList.add('webp')
        localStorage.setItem(STORAGE_KEY, supports)
      })
    }
  }, [])

  return (
    <WebpContext.Provider value={webp}>{props.children}</WebpContext.Provider>
  )
}
