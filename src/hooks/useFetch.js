import React from 'react'

const cache = new Map()

const useFetch = (path, options = {}) => {
  const { format = 'JSON', skip = false } = options
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState(cache.get(path))

  React.useEffect(() => {
    if (typeof data === 'undefined' && !skip) {
      setLoading(true)
      fetch(path)
        .then(response =>
          format === 'JSON' ? response.json() : response.text()
        )
        .then(data => {
          cache.set(path, data)
          setData(data)
          setLoading(false)
        })
        .catch(error => {
          setError(true)
          setLoading(false)
        })
    }
  }, [data, format, skip, path])

  return { loading, error, data }
}

export default useFetch
