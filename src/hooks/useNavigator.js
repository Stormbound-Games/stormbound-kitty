import React from 'react'
import { useRouter } from 'next/router'

const useNavigator = () => {
  const router = useRouter()
  const { push: routerPush, replace: routerReplace } = router
  const push = React.useCallback(
    (path, { preserveScroll = false } = {}) => {
      routerPush(path, undefined, { scroll: preserveScroll })
    },
    [routerPush]
  )
  const replace = React.useCallback(
    (path, { preserveScroll = false } = {}) => {
      routerReplace(path, undefined, { scroll: preserveScroll })
    },
    [routerReplace]
  )

  return { push, replace }
}

export default useNavigator
