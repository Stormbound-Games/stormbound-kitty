import React from 'react'
import { useFela } from 'react-fela'
import useSpacing from '~/hooks/useSpacing'

export default React.memo(function Spacing({
  as: Component = 'div',
  all,
  vertical,
  horizontal,
  top,
  right,
  bottom,
  left,
  ...props
}) {
  const { css } = useFela()
  const spacing = useSpacing({
    all,
    vertical,
    horizontal,
    top,
    right,
    bottom,
    left,
  })

  return (
    <Component {...props} className={css(spacing)}>
      {props.children}
    </Component>
  )
})
