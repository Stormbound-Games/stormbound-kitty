import React from 'react'
import ErrorBoundary from '../ErrorBoundary'
import Router from '../Router'
import Layout from '../Layout'
import supportsWebp from '../../helpers/supportsWebp'

const Root = props => {
  React.useEffect(() => {
    supportsWebp().then(supports => {
      supports && document.documentElement.classList.add('webp')
    })
  }, [])

  return (
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  )
}

export default Root
