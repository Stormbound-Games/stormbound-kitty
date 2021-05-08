import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedSWCCEntry(props) {
  return (
    <FeedEntry icon='wand' date={props.date}>
      {props.author} has started a new season of the{' '}
      <Link to='/card/contest'>Stormbound Weekly Card Contest</Link> (SWCC for
      short).
    </FeedEntry>
  )
})
