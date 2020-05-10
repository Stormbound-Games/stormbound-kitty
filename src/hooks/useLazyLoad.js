import React from 'react'
import { useInView } from 'react-intersection-observer'

const useLazyLoad = (collection, itemsPerPage) => {
  const [ref, inView] = useInView()
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const loadMore = React.useCallback(() => {
    if (page * itemsPerPage < collection.length) {
      setLoading(true)
      setTimeout(() => {
        setPage(page => page + 1)
        setLoading(false)
      }, 500)
    }
    // eslint-disable-next-line
  }, [collection.length, itemsPerPage])

  React.useEffect(() => loadMore(), [inView, loadMore])

  return { loading, items: collection.slice(0, page * itemsPerPage), ref }
}

export default useLazyLoad
