import React from 'react'
import Link from '~/components/Link'
import Only from '~/components/Only'
import TogglableContent from '~/components/TogglableContent'

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
            <Link
              {...toggleProps}
              onClick={() => expand(s => !s)}
              extend={{ marginBottom: 'var(--s-base)' }}
            >
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
