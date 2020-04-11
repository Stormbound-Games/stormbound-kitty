import React from 'react'
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
      <Router />
    </ErrorBoundary>
  )
}

export default Root
