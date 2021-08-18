import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { RendererProvider } from 'react-fela'
import CollectionProvider from '~/components/CollectionProvider'
import ErrorBoundary from '~/components/ErrorBoundary'
import NotificationProvider from '~/components/NotificationProvider'
import PersonalDecksProvider from '~/components/PersonalDecksProvider'
import ImageSupportProvider from '~/components/ImageSupportProvider'
import UserProvider from '~/components/UserProvider'
import Router from '~/components/Router'
import createFelaRenderer from '~/helpers/createFelaRenderer'
import renderRootStyles from '~/helpers/renderRootStyles'

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
                    <Router />
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
