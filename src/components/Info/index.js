import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function Info(props) {
  return (
    <div
      className={['Info', props.CTA && 'Info--with-cta']
        .filter(Boolean)
        .join(' ')}
    >
      <span className='Info__title'>
        {!!props.icon && <Icon className='Info__icon' icon={props.icon} />}{' '}
        {props.title}
      </span>
      {props.children}
      {props.CTA && <span className='Info__CTA'>{props.CTA}</span>}
    </div>
  )
})
