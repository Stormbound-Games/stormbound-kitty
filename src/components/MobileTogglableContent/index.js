import React from 'react'
import Only from '../Only'
import TogglableContent from '../TogglableContent'

export default React.memo(function (props) {
  const [isExpanded, expand] = React.useState(false)
  const labelExpanded = (props.withSymbols ? '+ ' : '') + props.labelExpanded
  const labelCollapsed = (props.withSymbols ? '+ ' : '') + props.labelCollapsed

  return (
    <>
      <Only.Desktop>{props.children}</Only.Desktop>
      <Only.Mobile>
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
      </Only.Mobile>
    </>
  )
})
