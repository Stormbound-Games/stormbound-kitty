import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

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

const icon = ({ color }) => ({
  color,
  fontSize: '80%',
  position: 'relative',
  transform: 'translateY(10%)',
  display: 'inline-block',
  marginLeft: '1ch',
  cursor: 'help',
})

export default React.memo(function TooltipedIcon(props) {
  const { css } = useFela({ color: props.color })

  return (
    <Tooltip style={tooltipStyles} label={props.label}>
      {trigger => (
        <span {...trigger} className={css(icon)}>
          <Icon icon={props.icon} />
        </span>
      )}
    </Tooltip>
  )
})
