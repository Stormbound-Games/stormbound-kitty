import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { RendererProvider } from 'react-fela'
import CollectionProvider from '../CollectionProvider'
import ErrorBoundary from '../ErrorBoundary'
import NotificationProvider from '../NotificationProvider'
import PersonalDecksProvider from '../PersonalDecksProvider'
import ImageSupportProvider from '../ImageSupportProvider'
import UserProvider from '../UserProvider'
import createFelaRenderer from '../../helpers/createFelaRenderer'
import renderRootStyles from '../../helpers/renderRootStyles'

const renderer = createFelaRenderer()
renderRootStyles(renderer)

export default function Root(props) {
  return (
    <RendererProvider renderer={renderer}>
      <HelmetProvider>
        <ErrorBoundary>
          <ImageSupportProvider>
            <NotificationProvider>
              <CollectionProvider>
                <PersonalDecksProvider>
                  <UserProvider>
                    <Helmet>
                      <meta name='author' content='Kitty' />
                    </Helmet>
                  </UserProvider>
                </PersonalDecksProvider>
              </CollectionProvider>
            </NotificationProvider>
          </ImageSupportProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </RendererProvider>
  )
}
