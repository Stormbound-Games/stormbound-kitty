import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function Info(props) {
  return (
    <div
      className={['Info', props.CTA && 'Info--with-cta', props.className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className='Info__title'>
        {!!props.icon && <Icon className='Info__icon' icon={props.icon} />}{' '}
        {props.title}
      </span>
      {props.children}
      {props.CTA && <div className='Info__CTA'>{props.CTA}</div>}
    </div>
  )
})
