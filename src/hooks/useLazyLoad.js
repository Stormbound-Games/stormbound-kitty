import React from 'react'
import { useInView } from 'react-intersection-observer'

const LOADING_DURATION = 350

const useLazyLoad = (collection, itemsPerPage, automatic = true) => {
  const [ref, inView] = useInView()
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const canLoadMore =
    collection.length && page * itemsPerPage < collection.length
  const loadMore = React.useCallback(() => {
    if (canLoadMore) {
      setLoading(true)
      setTimeout(() => {
        setPage(page => page + 1)
        setLoading(false)
      }, LOADING_DURATION)
    }
  }, [canLoadMore])

  React.useEffect(() => {
    if (inView && automatic) loadMore()
  }, [inView, automatic, loadMore])

  return {
    items: collection.slice(0, page * itemsPerPage),
    loading,
    loadMore: canLoadMore ? loadMore : undefined,
    ref,
  }
}

export default useLazyLoad
