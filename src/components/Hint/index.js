import React from 'react'

const Hint = React.memo(props => (
  <p className={props.className}>
    <span role='img' aria-label='info'>
      ❔
    </span>{' '}
    {props.children}
  </p>
))

export default Hint
