import React from 'react'

const cache = new Map()

const useFetch = (path, options = { format: 'JSON' }) => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState(cache.get(path))

  React.useEffect(() => {
    if (typeof data === 'undefined') {
      setLoading(true)
      fetch(path)
        .then(response =>
          options.format === 'JSON' ? response.json() : response.text()
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
  }, [data, options.format, path])

  return { loading, error, data }
}

export default useFetch
