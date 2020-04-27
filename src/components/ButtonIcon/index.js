import React from 'react'
import './index.css'

export default React.memo(function ButtonIcon(props) {
  return (
    <button {...props} className={`ButtonIcon ${props.className || ''}`}>
      {props.children}
    </button>
  )
})
