import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import NotificationProvider from '../NotificationProvider'
import WebpProvider from '../WebpProvider'
import Router from '../Router'

export default function Root(props) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <WebpProvider>
          <NotificationProvider>
            <CollectionProvider>
              <Router />
              <Helmet>
                <meta name='author' content='Kitty' />
              </Helmet>
            </CollectionProvider>
          </NotificationProvider>
        </WebpProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
