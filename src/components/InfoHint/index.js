import React from 'react'
import Icon from '../Icon'
import './index.css'

const InfoHint = props => (
  <p className='InfoHint'>
    {props.icon && <Icon icon={props.icon} />} {props.children}
  </p>
)

export default InfoHint
