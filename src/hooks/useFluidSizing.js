import React from 'react'
import useViewportSize from './useViewportSize'

export default (ratio, defaultWidth = undefined) => {
  const { viewportWidth } = useViewportSize()
  const ref = React.createRef()
  const [fontSize, setFontSize] = React.useState(
    defaultWidth ? defaultWidth * ratio + 'px' : undefined
  )

  React.useEffect(() => {
    setFontSize(ref.current.offsetWidth * ratio + 'px')
  }, [ratio, ref, viewportWidth])

  return { fontSize, ref }
}
