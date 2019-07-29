import React from 'react'
import ErrorBoundary from '../ErrorBoundary'
import Router from '../Router'
import Layout from '../Layout'

const Root = props => {
  return (
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  )
}

export default Root
