import React from 'react'
import { Link } from 'react-router-dom'
import HeaderBanner from '../HeaderBanner'
import './index.css'

export default React.memo(function Article(props) {
  const backLink = props.backLink || {}

  return (
    <article className={['Article', props.className].filter(Boolean).join(' ')}>
      <HeaderBanner title={props.title} background={props.background} />

      <p className='Article__meta'>
        {props.author && (
          <span className='Article__author'>
            Written by{' '}
            <Link to={`/member/${props.author}`}>{props.author}</Link>
          </span>
        )}
        &nbsp;·&nbsp;
        {props.readingTime && (
          <span className='Article__readingTime'>{props.readingTime}</span>
        )}
        {Object.keys(backLink).length > 0 && (
          <Link {...backLink} className='Article__backLink' />
        )}
      </p>

      <div
        className={[
          'Article__content',
          props.noDropCap && 'Article__content--no-drop-cap',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}
      </div>
    </article>
  )
})
