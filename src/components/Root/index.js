import React from 'react'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import NotificationProvider from '../NotificationProvider'
import WebpProvider from '../WebpProvider'
import Router from '../Router'

const Root = props => {
  React.useEffect(() => {
    if (!window.Cypress) {
      window.document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  return (
    <ErrorBoundary>
      <WebpProvider>
        <NotificationProvider>
          <CollectionProvider>
            <Router />
          </CollectionProvider>
        </NotificationProvider>
      </WebpProvider>
    </ErrorBoundary>
  )
}

export default Root
