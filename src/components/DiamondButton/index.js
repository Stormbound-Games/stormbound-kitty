import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function DiamondButton(props) {
  return (
    <button
      className='DiamondButton'
      data-testid={props['data-testid']}
      aria-label={props['aria-label']}
      onClick={props.onClick}
      title={props.title}
    >
      <Icon icon={props.icon} />
    </button>
  )
})
