import React from 'react'
import './index.css'

const Row = props => (
  <div
    className={[
      'Row',
      props.desktopOnly && 'Row--desktop',
      props.wideGutter && 'Row--wide',
    ]
      .filter(Boolean)
      .join(' ')}
    data-testid={props['data-testid']}
  >
    {React.Children.map(props.children, child =>
      child === null
        ? null
        : React.cloneElement(child, {
            desktopOnly: props.desktopOnly,
            wideGutter: props.wideGutter,
          })
    )}
  </div>
)

export default Row
