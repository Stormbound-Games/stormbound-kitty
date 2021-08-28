import React from 'react'
import useImageSupport from '~/hooks/useImageSupport'

export const ImageSupportContext = React.createContext({})

export default React.memo(function ImageSupportProvider({ children }) {
  const support = useImageSupport()

  return (
    <ImageSupportContext.Provider value={support}>
      {children}
    </ImageSupportContext.Provider>
  )
})
