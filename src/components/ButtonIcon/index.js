import React from 'react'
import './index.css'

const ButtonIcon = React.memo(function ButtonIcon(props) {
  return (
    <button {...props} className={`ButtonIcon ${props.className || ''}`}>
      {props.children}
    </button>
  )
})

export default ButtonIcon
