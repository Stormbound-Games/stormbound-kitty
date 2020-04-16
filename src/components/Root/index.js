import React from 'react'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import Router from '../Router'
import supportsWebp from '../../helpers/supportsWebp'

const Root = props => {
  React.useEffect(() => {
    supportsWebp().then(supports => {
      supports && document.documentElement.classList.add('webp')
    })
  }, [])

  return (
    <ErrorBoundary>
      <CollectionProvider>
        <Router />
      </CollectionProvider>
    </ErrorBoundary>
  )
}

export default Root
