import React from 'react'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedHostEntry(props) {
  const name = props.hosts.find(u => u.toLowerCase() === props.user)

  return (
    <FeedEntry icon='users' date={props.date}>
      {name} has organised {props.name}.
    </FeedEntry>
  )
})
