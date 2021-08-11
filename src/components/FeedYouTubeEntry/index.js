import React from 'react'
import FeedEntry from '../FeedEntry'
import Link from '../Link'

export default React.memo(function FeedSWCCEntry(props) {
  return (
    <FeedEntry icon='youtube' date='External channel'>
      {props.author} is a{' '}
      <Link href={props.href} inNewTab>
        content creator on YouTube
      </Link>
      .
    </FeedEntry>
  )
})
