import React from 'react'
import Icon from '../Icon'
import './index.css'

const Notification = React.memo(props =>
  props.isVisible ? (
    <p className='Notification'>
      {props.icon && <Icon icon={props.icon} />} {props.children}
    </p>
  ) : null
)

export default Notification
