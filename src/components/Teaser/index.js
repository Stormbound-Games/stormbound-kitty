import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

export default React.memo(function Teaser(props) {
  const card = resolveCardForLevel({ level: 5, id: props.cardId })
  const title = props.title

  return (
    <div className='Teaser'>
      <div
        className='Teaser__header'
        style={{
          '--color': `var(--light-${card.faction}, var(--dark-beige))`,
        }}
      >
        <Card {...card} />
      </div>
      <div className='Teaser__body'>
        {props.meta && <p className='Teaser__meta'>{props.meta}</p>}
        <h2 className='Teaser__title'>
          {props.to ? (
            <Link className='Teaser__link' to={props.to}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className='Teaser__excerpt'>{props.excerpt}</p>
      </div>
    </div>
  )
})
