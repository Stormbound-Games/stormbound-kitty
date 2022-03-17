import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedStoryEntry(props) {
  return (
    <FeedEntry icon='quill' date={props.date}>
      <Link to={'/members/' + props.author.slug}>{props.author.name}</Link> has
      written a story about this card called{' '}
      <Link to={'/stories/' + props.slug}>{props.title}</Link>.
      <blockquote>{props.excerpt}</blockquote>
    </FeedEntry>
  )
})
