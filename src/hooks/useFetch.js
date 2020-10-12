import React from 'react'
import usePrevious from './usePrevious'

const cache = new Map()

const DEFAULT_STATE = { data: undefined, error: undefined, loading: false }

const useFetch = path => {
  const [state, setState] = React.useState(cache.get(path) || DEFAULT_STATE)
  const previousPath = usePrevious(path)
  const hasPathChanged = previousPath && previousPath !== path
  const shouldQuery =
    !state.loading && !state.error && (!state.data || hasPathChanged)

  React.useEffect(() => {
    cache.set(path, state)
  }, [path, state])

  React.useEffect(() => {
    if (!shouldQuery) return
    setState(state => ({ ...state, loading: true }))
    fetch(path)
      .then(response => response.json())
      .then(data => setState({ data, error: undefined, loading: false }))
      .catch(error => setState({ data: undefined, error, loading: false }))
  }, [path, shouldQuery])

  return state
}

export default useFetch
