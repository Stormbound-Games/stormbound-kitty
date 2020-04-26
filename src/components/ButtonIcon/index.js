import React from 'react'
import './index.css'

const ButtonIcon = React.memo(props => (
  <button {...props} className={`ButtonIcon ${props.className || ''}`}>
    {props.children}
  </button>
))

export default ButtonIcon
