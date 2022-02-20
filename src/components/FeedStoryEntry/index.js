import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import { STORY_CATEGORIES } from '~/constants/stories'

export default React.memo(function FeedStoryEntry(props) {
  const category = STORY_CATEGORIES[props.category].shortName
  const prefix = /^[aeiou]/.test(category.toLowerCase()) ? 'an' : 'a'

  return (
    <FeedEntry icon='quill' date={props.date}>
      {props.author} has written {prefix}{' '}
      <Link to={'/stories/' + props.category}>{category}</Link> story called{' '}
      <Link to={'/stories/' + props.id}>{props.title}</Link>.
      <blockquote>{props.excerpt}</blockquote>
    </FeedEntry>
  )
})
