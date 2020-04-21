import React from 'react'
import supportsWebp from '../../helpers/supportsWebp'

export const WebpContext = React.createContext(false)

const WebpProvider = props => {
  const [webp, setWebp] = React.useState(false)

  React.useEffect(() => {
    supportsWebp().then(supports => {
      setWebp(supports)
      supports && document.documentElement.classList.add('webp')
    })
  }, [])

  return (
    <WebpContext.Provider value={{ webp }}>
      {props.children}
    </WebpContext.Provider>
  )
}

export default WebpProvider
