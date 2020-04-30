import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card'
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
    <div className='StoryTeaser'>
      <div
        className='StoryTeaser__header'
        style={{
          '--color': `var(--light-${card.faction}, var(--dark-beige))`,
        }}
      >
        <Card {...card} />
      </div>
      <div className='StoryTeaser__body'>
        {props.author && (
          <p className='StoryTeaser__meta'>
            <Link
              className='StoryTeaser__author'
              to={'/member/' + props.author}
            >
              {props.author}
            </Link>{' '}
            · {getReadingTime(props.content)}
          </p>
        )}
        <h2 className='StoryTeaser__title'>
          <Link className='StoryTeaser__link' to={props.to || `/stories/${id}`}>
            {title}
          </Link>
        </h2>
        <p className='StoryTeaser__excerpt'>{getExcerpt(props.content, 150)}</p>
      </div>
    </div>
  )
})
