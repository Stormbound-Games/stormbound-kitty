import React from 'react'
import { CollectionContext } from '~/components/CollectionProvider'
import useViewportSize from '~/hooks/useViewportSize'
import { BREAKPOINTS } from '~/constants/styles'

const Only = React.memo(function Only(props) {
  const { viewportWidth } = useViewportSize()
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  switch (props.when) {
    case 'MOBILE':
      return viewportWidth <= BREAKPOINTS.small.breakpoint
        ? props.children
        : null
    case 'DESKTOP':
      return viewportWidth >= BREAKPOINTS.medium.breakpoint
        ? props.children
        : null
    case 'DEFAULT_COLLECTION':
      return hasDefaultCollection ? props.children : null
    case 'CUSTOM_COLLECTION':
      return !hasDefaultCollection ? props.children : null
    default:
      return null
  }
})

const Mobile = props => <Only {...props} when='MOBILE' />
const Desktop = props => <Only {...props} when='DESKTOP' />
const DefaultCollection = props => <Only {...props} when='DEFAULT_COLLECTION' />
const CustomCollection = props => <Only {...props} when='CUSTOM_COLLECTION' />

const OnlyComponents = {
  Mobile: React.memo(Mobile),
  Desktop: React.memo(Desktop),
  DefaultCollection: React.memo(DefaultCollection),
  CustomCollection: React.memo(CustomCollection),
}

export default OnlyComponents
