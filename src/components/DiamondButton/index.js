import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function DiamondButton(props) {
  return (
    <button
      {...props}
      active={undefined}
      className={['DiamondButton', props.active && 'DiamondButton--active']
        .filter(Boolean)
        .join(' ')}
    >
      <Icon icon={props.icon} />
    </button>
  )
})
