import React from 'react'
import useViewportSize from '../../hooks/useViewportSize'
import TogglableContent from '../TogglableContent'

export default React.memo(function (props) {
  const { viewportWidth } = useViewportSize()
  const [isExpanded, expand] = React.useState(false)
  const labelExpanded = (props.withSymbols ? '+ ' : '') + props.labelExpanded
  const labelCollapsed = (props.withSymbols ? '+ ' : '') + props.labelCollapsed

  if (viewportWidth > 700) {
    return props.children
  }

  return (
    <TogglableContent
      id={props.id}
      isExpanded={isExpanded}
      renderToggle={toggleProps => (
        <>
          <button
            {...toggleProps}
            type='button'
            onClick={() => expand(s => !s)}
            className={['ButtonAsLink', props.className]
              .filter(Boolean)
              .join(' ')}
          >
            {isExpanded ? labelExpanded : labelCollapsed}
          </button>
        </>
      )}
    >
      {props.children}
    </TogglableContent>
  )
})
