import React from 'react'

export default React.memo(function Hint(props) {
  return (
    <p className={props.className}>
      <span role='img' aria-label='info'>
        ❔
      </span>{' '}
      {props.children}
    </p>
  )
})
