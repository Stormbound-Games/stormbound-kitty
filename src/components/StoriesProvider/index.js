import React from 'react'
import useFetch from '../../hooks/useFetch'

export const StoriesContext = React.createContext([])

export default React.memo(function StoriesProvider(props) {
  const { data: stories = [] } = useFetch('/stories.json')

  return (
    <StoriesContext.Provider value={stories}>
      {props.children}
    </StoriesContext.Provider>
  )
})
