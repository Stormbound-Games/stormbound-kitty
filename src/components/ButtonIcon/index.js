import React from 'react'
import './index.css'

const ButtonIcon = props => (
  <button {...props} className={`ButtonIcon ${props.className || ''}`}>
    {props.children}
  </button>
)

export default ButtonIcon
