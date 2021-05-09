import React from 'react'
import useFetch from '../../hooks/useFetch'

export const StoriesContext = React.createContext([])

export default React.memo(function StoriesProvider(props) {
  const { data: stories = [] } = useFetch('/stories.json')

  // Avoid using JSX in that specific instance because this file is imported in
  // `useMemberContent` which is also used by the Discord bot code, where JSX is
  // not supported.
  return React.createElement(
    StoriesContext.Provider,
    { value: stories },
    props.children
  )
})
