import React from 'react'
import FeedEntry from '#components/FeedEntry'
import Link from '#components/Link'

export default React.memo(function FeedYouTubeEntry(props) {
  return (
    <FeedEntry icon='youtube' date='External channel'>
      {props.user.name} is a{' '}
      <Link href={props.href}>content creator on YouTube</Link>.
    </FeedEntry>
  )
})
