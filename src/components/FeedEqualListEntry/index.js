import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedEqualListEntry(props) {
  return (
    <FeedEntry icon='star' date={props.date}>
      {props.author} has updated the{' '}
      <Link to='/list/equals'>equals tier list</Link>.
    </FeedEntry>
  )
})
