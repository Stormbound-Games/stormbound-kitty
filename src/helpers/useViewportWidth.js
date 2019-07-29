import React from 'react'
import getViewportWidth from './getViewportWidth'

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = React.useState(getViewportWidth())
  const recordViewportWidth = () => setViewportWidth(getViewportWidth())

  React.useEffect(() => {
    window.addEventListener('resize', recordViewportWidth)
    return () => window.removeEventListener('resize', recordViewportWidth)
  }, [])

  return viewportWidth
}

export default useViewportWidth
