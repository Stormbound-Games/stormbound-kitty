import React from 'react'
import { useFela } from 'react-fela'
import { useTooltip, TooltipPopup } from '@reach/tooltip'
import styles from './styles'

const resolvePosition = ({ position, offset, trigger, tooltip }) => {
  const collisions = {
    top: trigger.top - tooltip.height < 0,
    right: window.innerWidth < trigger.left + tooltip.width,
    bottom: window.innerHeight < trigger.bottom + tooltip.height + offset,
    left: trigger.left - tooltip.width < 0,
  }

  switch (position) {
    case 'bottom':
      return collisions.bottom && !collisions.top ? 'top' : 'bottom'
    case 'top':
      return collisions.top && !collisions.bottom ? 'bottom' : 'top'
    case 'left':
      return collisions.left && !collisions.right ? 'right' : 'left'
    case 'right':
      return collisions.right && !collisions.left ? 'left' : 'right'
    default:
      return position
  }
}

const getTooltipPosition =
  ({ offset = 8, position = 'bottom' }) =>
  (trigger, tooltip) => {
    const positionAfterCollisions = resolvePosition({
      position,
      offset,
      trigger,
      tooltip,
    })

    switch (positionAfterCollisions) {
      case 'bottom': {
        const triggerCenter = trigger.left + trigger.width / 2
        const left = triggerCenter - tooltip.width / 2
        const maxLeft = window.innerWidth - tooltip.width - 2

        return {
          left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
          top: `${trigger.top + offset + trigger.height + window.scrollY}px`,
        }
      }

      case 'top': {
        const triggerCenter = trigger.left + trigger.width / 2
        const left = triggerCenter - tooltip.width / 2
        const maxLeft = window.innerWidth - tooltip.width - 2

        return {
          left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
          top: `${trigger.top - offset - tooltip.height + window.scrollY}px`,
        }
      }

      case 'left': {
        const triggerCenter = trigger.top + trigger.height / 2
        const top = triggerCenter - tooltip.height / 2
        const maxTop = window.innerHeight - tooltip.height - 2

        return {
          top: Math.min(Math.max(2, top), maxTop) + window.scrollY,
          left: `${trigger.left - offset - tooltip.width + window.scrollX}px`,
        }
      }

      case 'right': {
        const triggerCenter = trigger.top + trigger.height / 2
        const top = triggerCenter - tooltip.height / 2
        const maxTop = window.innerHeight - tooltip.height - 2

        return {
          top: Math.min(Math.max(2, top), maxTop) + window.scrollY,
          left: `${trigger.left + offset + trigger.width + window.scrollX}px`,
        }
      }

      default:
        return {}
    }
  }

export default React.memo(function Tooltip({ children, extend, ...props }) {
  const { css } = useFela()
  const [trigger, tooltip] = useTooltip()

  return (
    <>
      {children(trigger)}
      <TooltipPopup
        {...tooltip}
        {...props}
        className={css(styles.tooltip, extend)}
        position={getTooltipPosition(props)}
      />
    </>
  )
})
