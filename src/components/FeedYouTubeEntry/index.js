import React from 'react'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'

export default React.memo(function FeedSWCCEntry(props) {
  return (
    <FeedEntry icon='youtube' date='External channel'>
      {props.displayName} is a{' '}
      <Link href={props.href}>content creator on YouTube</Link>.
    </FeedEntry>
  )
})
