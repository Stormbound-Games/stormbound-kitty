import React from 'react'
import './index.css'

export default React.memo(function Icon(props) {
  return (
    <svg
      className={['icon', `icon-${props.icon}`, props.className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
      focusable='false'
      viewBox='0 0 32 32'
    >
      <use xlinkHref={`#icon-${props.icon}`} />
    </svg>
  )
})
