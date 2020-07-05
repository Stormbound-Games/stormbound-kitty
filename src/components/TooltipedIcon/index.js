import React from 'react'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import './index.css'

const tooltipStyles = {
  backgroundColor: 'var(--dark-blue)',
  color: 'var(--white)',
  borderRadius: '2px',
  border: '1px solid var(--dark-beige)',
  boxShadow: '0 0 0 2px var(--dark-blue)',
  maxWidth: '15em',
  whiteSpace: 'normal',
  padding: '0.5em',
}

export default React.memo(function TooltipedIcon(props) {
  return (
    <Tooltip style={tooltipStyles} label={props.label}>
      {trigger => (
        <span
          {...trigger}
          className='TooltipedIcon'
          style={{ color: props.color }}
        >
          <Icon icon={props.icon} />
        </span>
      )}
    </Tooltip>
  )
})
