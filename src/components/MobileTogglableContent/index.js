import React from 'react'
import Link from '../Link'
import Only from '../Only'
import TogglableContent from '../TogglableContent'

export default React.memo(function MobileTogglableContent(props) {
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
            <Link {...toggleProps} onClick={() => expand(s => !s)}>
              {isExpanded ? labelExpanded : labelCollapsed}
            </Link>
          )}
        >
          {props.children}
        </TogglableContent>
      </Only.Mobile>
    </>
  )
})
