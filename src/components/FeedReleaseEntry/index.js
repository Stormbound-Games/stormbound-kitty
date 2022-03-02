import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedReleaseEntry(props) {
  return (
    <FeedEntry icon='bullhorn' date={props.date}>
      {props.user.name} has published release notes for the{' '}
      <Link to={'/releases/' + props.slug}>{props.name}</Link>.
    </FeedEntry>
  )
})
