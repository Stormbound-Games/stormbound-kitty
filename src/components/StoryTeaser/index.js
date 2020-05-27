import React from 'react'
import { Link } from 'react-router-dom'
import Teaser from '../Teaser'
import capitalise from '../../helpers/capitalise'
import getExcerpt from '../../helpers/getExcerpt'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const StoryAuthor = React.memo(function StoryAuthor(props) {
  return (
    <>
      {capitalise(props.type || 'story')} by{' '}
      <Link className='StoryTeaser__author' to={'/member/' + props.author}>
        {props.author}
      </Link>{' '}
    </>
  )
})

export default React.memo(function StoryTeaser(props) {
  const id =
    props.id ||
    window.btoa(encodeURIComponent(props.title + '-' + props.author))
  const excerpt = getExcerpt(props.content, 150)
  const meta = <StoryAuthor {...props} />

  return (
    <Teaser
      {...props}
      card={{ ...getRawCardData(props.cardId), ...props.card }}
      meta={meta}
      excerpt={excerpt}
      to={`/stories/${id}`}
    />
  )
})
