import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedReleaseEntry(props) {
  return (
    <FeedEntry icon='bullhorn' date={props.date}>
      {props.user.name} has published official release notes titled{' '}
      <Link to={'/releases/' + props.slug}>{props.title}</Link>.
    </FeedEntry>
  )
})
