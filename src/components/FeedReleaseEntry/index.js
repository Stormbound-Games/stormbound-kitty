import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedReleaseEntry(props) {
  return (
    <FeedEntry icon='bullhorn' date={props.date}>
      {props.author} has published release notes for the{' '}
      <Link to={'/changelog/' + props.slug}>{props.title}</Link>.
    </FeedEntry>
  )
})
