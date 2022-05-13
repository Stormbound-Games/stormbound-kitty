import React from 'react'
import useViewportSize from './useViewportSize'

const useFluidSizing = (ratio, defaultWidth = undefined) => {
  const { viewportWidth } = useViewportSize()
  const ref = React.useRef(null)
  const [fontSize, setFontSize] = React.useState(
    defaultWidth ? defaultWidth * ratio + 'px' : undefined
  )

  React.useEffect(() => {
    // If the DOM element lives within a closed <details> element, its
    // `offsetWidth` will be 0. To get its actual width, we can briefly open and
    // close the <details> element.
    const details = ref.current.closest('details:not([open])')
    if (details) details.setAttribute('open', 'open')
    const width = ref.current.offsetWidth
    if (details) details.removeAttribute('open')

    setFontSize(width * ratio + 'px')
  }, [ratio, ref, viewportWidth])

  return { fontSize, ref }
}

export default useFluidSizing
