import React from 'react'
import { useFela } from 'react-fela'
import useSpacing from '../../hooks/useSpacing'

const Spacing = ({
  as: Component = 'div',
  all,
  vertical,
  horizontal,
  top,
  right,
  bottom,
  left,
  isBlock,
  ...props
}) => {
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
    <Component
      {...props}
      className={css({ display: isBlock ? 'block' : undefined }, spacing)}
    >
      {props.children}
    </Component>
  )
}

export default Spacing
