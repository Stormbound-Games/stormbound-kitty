import React from 'react'
import getViewportWidth from '../helpers/getViewportWidth'

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = React.useState(getViewportWidth())
  const recordViewportWidth = React.useCallback(
    () => setViewportWidth(getViewportWidth()),
    []
  )

  React.useEffect(() => {
    window.addEventListener('resize', recordViewportWidth)
    return () => window.removeEventListener('resize', recordViewportWidth)
  }, [recordViewportWidth])

  return viewportWidth
}

export default useViewportWidth
