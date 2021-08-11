import React from 'react'
import Link from '../Link'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedReleaseEntry(props) {
  return (
    <FeedEntry icon='bullhorn' date={props.date}>
      Kitty has published release notes for the{' '}
      <Link to={'/releases/' + props.slug}>{props.name}</Link>.
    </FeedEntry>
  )
})
