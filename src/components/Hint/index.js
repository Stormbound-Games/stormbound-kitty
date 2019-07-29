import React from 'react'
import './index.css'

const Hint = props => (
  <p className={['Hint', props.className].filter(Boolean).join(' ')}>
    <span role="img" aria-label="info">
      ❔
    </span>{' '}
    {props.children}
  </p>
)

export default Hint
