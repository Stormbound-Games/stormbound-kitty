import React from 'react'
import supportsImageFormat from '~/helpers/supportsImageFormat'

export const ImageSupportContext = React.createContext(false)

const getStoredSupport = format => {
  try {
    return JSON.parse(localStorage.getItem('sk.' + format))
  } catch {
    return null
  }
}

export default React.memo(function ImageSupportProvider(props) {
  const [webp, setWebp] = React.useState(true)
  const [avif, setAvif] = React.useState(false)

  React.useEffect(() => {
    let storedWebp = null
    let storedAvif = null

    try {
      // `localStorage` is not defined in some Android webviews and should
      // always be safeguarded to avoid a runtime JavaScript error.
      storedWebp = getStoredSupport('webp')
      storedAvif = getStoredSupport('avif')
      // eslint-disable-next-line
    } catch (error) {}

    if (storedWebp === null) {
      supportsImageFormat('webp').then(supports => {
        setWebp(supports)
        if (supports) document.documentElement.classList.add('webp')
        localStorage.setItem('sk.webp', supports)
      })
    } else if (storedWebp) {
      document.documentElement.classList.add('webp')
      setWebp(true)
    }

    if (storedAvif === null) {
      supportsImageFormat('avif').then(supports => {
        setAvif(supports)
        if (supports) document.documentElement.classList.add('avif')
        localStorage.setItem('sk.avif', supports)
      })
    } else if (storedAvif) {
      document.documentElement.classList.add('avif')
      setAvif(true)
    }
  }, [])

  return (
    <ImageSupportContext.Provider
      value={{ supportsWebp: webp, supportsAvif: avif }}
    >
      {props.children}
    </ImageSupportContext.Provider>
  )
})
