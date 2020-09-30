import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import { STORY_CATEGORIES } from '../../constants/stories'

export default React.memo(function FeedStoryEntry(props) {
  const category = STORY_CATEGORIES[props.category].shortName.toLowerCase()

  return (
    <FeedEntry icon='quill' date={props.date}>
      {props.author} has written a {category} story called{' '}
      <Link to={'/story/' + props.id}>{props.title}</Link>.
      <blockquote>{props.content}</blockquote>
    </FeedEntry>
  )
})
