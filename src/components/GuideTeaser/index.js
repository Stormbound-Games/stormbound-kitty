import React from 'react'
import { Link } from 'react-router-dom'
import Teaser from '../Teaser'

export default React.memo(function GuideTeaser(props) {
  return (
    <Teaser
      cardId={props.cardId}
      title={props.name}
      meta={
        <>
          Written by{' '}
          <Link className='StoryTeaser__author' to={'/member/' + props.author}>
            {props.author}
          </Link>
        </>
      }
      excerpt={props.excerpt}
      to={props.link}
    />
  )
})
