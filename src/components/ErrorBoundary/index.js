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

  handleError = event => {
    // The `ChunkLoadError` happens when navigating during a deployment. The
    // current chunks have been wiped from the `build` folder and replaced with
    // new ones, yielding a loading error. Only a reload can fix it.
    if (
      event.error.name === 'ChunkLoadError' ||
      event.error.message.toLowerCase().includes('loading chunk')
    ) {
      this.setState({ hasError: true, error: 'ChunkLoadError' })
    }
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError)
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    console.error({ error, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error
          error={this.state.error}
          retry={
            this.state.error === 'ChunkLoadError'
              ? () => window.location.reload()
              : undefined
          }
        />
      )
    }

    return this.props.children
  }
}
