import React from 'react'
import useViewportWidth from './useViewportWidth'

export default ratio => {
  const viewportWidth = useViewportWidth()
  const ref = React.createRef()
  const [fontSize, setFontSize] = React.useState('100%')

  React.useEffect(() => {
    setFontSize(ref.current.offsetWidth * ratio + 'px')
  }, [ref.current, viewportWidth])

  return { fontSize, ref }
}
