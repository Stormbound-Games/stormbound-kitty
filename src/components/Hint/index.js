import React from 'react'

const Hint = React.memo(function Hint(props) {
  return (
    <p className={props.className}>
      <span role='img' aria-label='info'>
        ❔
      </span>{' '}
      {props.children}
    </p>
  )
})

export default Hint
