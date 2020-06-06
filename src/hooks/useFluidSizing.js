import React from 'react'
import useViewportWidth from './useViewportWidth'

export default ratio => {
  const viewportWidth = useViewportWidth()
  const ref = React.createRef()
  const [fontSize, setFontSize] = React.useState(undefined)

  React.useEffect(() => {
    setFontSize(ref.current.offsetWidth * ratio + 'px')
  }, [ratio, ref, viewportWidth])

  return { fontSize, ref }
}
