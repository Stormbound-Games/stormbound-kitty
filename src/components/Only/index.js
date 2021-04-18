import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import useViewportSize from '../../hooks/useViewportSize'

const Only = React.memo(function Only(props) {
  const { viewportWidth } = useViewportSize()
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  switch (props.when) {
    case 'MOBILE':
      return viewportWidth < 700 ? props.children : null
    case 'DESKTOP':
      return viewportWidth >= 700 ? props.children : null
    case 'DEFAULT_COLLECTION':
      return hasDefaultCollection ? props.children : null
    case 'CUSTOM_COLLECTION':
      return !hasDefaultCollection ? props.children : null
    default:
      return null
  }
})

export default {
  Mobile: React.memo(props => <Only {...props} when='MOBILE' />),
  Desktop: React.memo(props => <Only {...props} when='DESKTOP' />),
  DefaultCollection: React.memo(props => (
    <Only {...props} when='DEFAULT_COLLECTION' />
  )),
  CustomCollection: React.memo(props => (
    <Only {...props} when='CUSTOM_COLLECTION' />
  )),
}
