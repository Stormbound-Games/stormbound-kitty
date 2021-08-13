import React from 'react'
import { useFela } from 'react-fela'

export const visuallyHidden = {
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: '1px',
  overflow: 'hidden',
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
}

export default React.memo(function VisuallyHidden({
  as: Component = 'span',
  ...props
}) {
  const { css } = useFela()

  return <Component {...props} className={css(visuallyHidden)} />
})
