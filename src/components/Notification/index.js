import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function Notification(props) {
  return props.isVisible ? (
    <p className='Notification'>
      {props.icon && <Icon className='Notification__icon' icon={props.icon} />}{' '}
      {props.children}
    </p>
  ) : null
})
