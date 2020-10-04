import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import NotificationProvider from '../NotificationProvider'
import PersonalDecksProvider from '../PersonalDecksProvider'
import ImageSupportProvider from '../ImageSupportProvider'
import Router from '../Router'

export default function Root(props) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ImageSupportProvider>
          <NotificationProvider>
            <CollectionProvider>
              <PersonalDecksProvider>
                <Router />
                <Helmet>
                  <meta name='author' content='Kitty' />
                </Helmet>
              </PersonalDecksProvider>
            </CollectionProvider>
          </NotificationProvider>
        </ImageSupportProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}
