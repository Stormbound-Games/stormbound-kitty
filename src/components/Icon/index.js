import React from 'react'
import './index.css'

const Icon = React.memo(function Icon(props) {
  return (
    <svg
      className={`icon icon-${props.icon}`}
      aria-hidden
      focusable='false'
      viewBox='0 0 32 32'
    >
      <use xlinkHref={`#icon-${props.icon}`} />
    </svg>
  )
})

export default Icon
