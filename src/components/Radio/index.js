import React from 'react'
import './index.css'

const Radio = props => (
  <label className={`Radio ${props.className || ''}`} htmlFor={props.id}>
    <input
      type='radio'
      {...props}
      children={undefined}
      className='Radio__input'
    />
    <span
      className={['Radio__icon', props.checked && 'Radio__icon--checked']
        .filter(Boolean)
        .join(' ')}
    />
    <span className='Radio__label'>{props.children}</span>
  </label>
)

export default Radio
