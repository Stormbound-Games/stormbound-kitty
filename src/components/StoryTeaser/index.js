import React from 'react'
import { Link } from 'react-router-dom'
import Teaser from '../Teaser'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import getExcerpt from '../../helpers/getExcerpt'
import './index.css'

const getReadingTime = content => {
  const words = content.split(/\s+/g).length

  return words < 300 ? '1 minute' : `${Math.floor(words / 150)} minutes`
}

export default React.memo(function StoryTeaser(props) {
  const card = resolveCardForLevel({ level: 5, id: props.cardId })
  const title = props.title || card.name || 'Story'
  const id = window.btoa(encodeURIComponent(title + '-' + props.author))

  return (
    <Teaser
      cardId={props.cardId}
      title={title}
      meta={
        <>
          <Link className='StoryTeaser__author' to={'/member/' + props.author}>
            {props.author}
          </Link>{' '}
          · {getReadingTime(props.content)}
        </>
      }
      excerpt={getExcerpt(props.content, 150)}
      to={`/stories/${id}`}
    />
  )
})
