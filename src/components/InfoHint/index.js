import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function InfoHint(props) {
  return (
    <p className='InfoHint'>
      {props.icon && <Icon icon={props.icon} />} {props.children}
    </p>
  )
})
