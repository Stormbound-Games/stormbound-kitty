import React from 'react'
import './index.css'

const Column = props => (
  <div
    className={[
      'Column',
      props.desktopOnly && 'Column--desktop',
      props.wideGutter && 'Column--wide',
      !!props.width && `Column--${props.width}`
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {props.children}
  </div>
)

export default Column
