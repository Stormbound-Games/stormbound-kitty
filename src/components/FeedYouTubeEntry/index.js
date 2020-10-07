import React from 'react'
import FeedEntry from '../FeedEntry'

export default React.memo(function FeedSWCCEntry(props) {
  return (
    <FeedEntry icon='youtube' date='External channel'>
      {props.author} is a{' '}
      <a href={props.href} target='_blank' rel='noopener noreferrer'>
        content creator on YouTube
      </a>
      .
    </FeedEntry>
  )
})
