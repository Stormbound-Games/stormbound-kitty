import React from 'react'
import { useTooltip, TooltipPopup } from '@reach/tooltip'
import '@reach/tooltip/styles.css'

const OFFSET = 8

// Center the tooltip, but collisions will win
const centered = (triggerRect, tooltipRect) => {
  const collisions = {
    top: triggerRect.top - tooltipRect.height < 0,
    right: window.innerWidth < triggerRect.left + tooltipRect.width,
    bottom:
      window.innerHeight < triggerRect.bottom + tooltipRect.height + OFFSET,
    left: triggerRect.left - tooltipRect.width < 0,
  }

  const directionUp = collisions.bottom && !collisions.top
  const triggerCenter = triggerRect.left + triggerRect.width / 2
  const left = triggerCenter - tooltipRect.width / 2
  const maxLeft = window.innerWidth - tooltipRect.width - 2

  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: directionUp
      ? `${triggerRect.top - OFFSET - tooltipRect.height + window.scrollY}px`
      : `${triggerRect.top + OFFSET + triggerRect.height + window.scrollY}px`,
  }
}

export default React.memo(function Tooltip({ children, ...props }) {
  const [trigger, tooltip] = useTooltip()

  return (
    <>
      {children(trigger)}
      <TooltipPopup {...tooltip} {...props} position={centered} />
    </>
  )
})
