import React from 'react'
import Icon from '../Icon'
import './index.css'

const InfoHint = React.memo(function InfoHint(props) {
  return (
    <p className='InfoHint'>
      {props.icon && <Icon icon={props.icon} />} {props.children}
    </p>
  )
})

export default InfoHint
