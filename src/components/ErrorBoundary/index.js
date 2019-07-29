import React from 'react'
import Error from '../Error'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.message }
  }

  componentDidCatch(error, info) {
    console.error({ error, info })
  }

  render() {
    if (this.state.hasError) {
      return <Error error={this.state.error} />
    }

    return this.props.children
  }
}
