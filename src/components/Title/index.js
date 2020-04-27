import React from 'react'
import './index.css'

const Title = React.memo(function Title(props) {
  const Element = props.element || 'h2'

  return (
    <Element
      className={`Title ${props.className || ''}`}
      data-testid={props['data-testid']}
      id={props.id}
      aria-hidden={props['aria-hidden']}
    >
      <span className='Title__inner'>
        <span className='Title__content'>{props.children}</span>
      </span>
    </Element>
  )
})

export default Title
