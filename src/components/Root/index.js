import React from 'react'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import NotificationProvider from '../NotificationProvider'
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
      <NotificationProvider>
        <CollectionProvider>
          <Router />
        </CollectionProvider>
      </NotificationProvider>
    </ErrorBoundary>
  )
}

export default Root
