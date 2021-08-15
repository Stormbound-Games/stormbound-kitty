import React from 'react'
import getViewportSize from '../helpers/getViewportSize'

const useViewportSize = () => {
  const [dimensions, setDimensions] = React.useState({
    width: Infinity,
    height: Infinity,
  })
  const recordViewportWidth = React.useCallback(
    () => setDimensions(getViewportSize()),
    []
  )

  React.useEffect(() => {
    recordViewportWidth()
    window.addEventListener('resize', recordViewportWidth)
    return () => window.removeEventListener('resize', recordViewportWidth)
  }, [recordViewportWidth])

  return dimensions
}

export default useViewportSize
