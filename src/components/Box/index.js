import React from 'react'
import './index.css'

export default React.memo(function Box(props) {
  const Element = props.element || 'p'

  return (
    <Element
      style={props.style}
      className={['Box', props.className].filter(Boolean).join(' ')}
    >
      {props.children}
    </Element>
  )
})
