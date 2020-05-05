import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function Notice(props) {
  return (
    <p className='Notice'>
      {props.icon && <Icon className='Notice__icon' icon={props.icon} />}{' '}
      {props.children}
    </p>
  )
})
