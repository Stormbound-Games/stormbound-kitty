import React from 'react'
import { Link } from 'react-router-dom'
import HeaderBanner from '../HeaderBanner'
import './index.css'

export const renderAuthorsLinks = (acc, author, index, authors) => {
  if (authors.length > 1 && index === authors.length - 1) {
    acc.push(' and ')
  } else if (index !== 0) {
    acc.push(', ')
  }

  acc.push(
    <Link to={`/member/${author}`} key={author}>
      {author}
    </Link>
  )

  return acc
}

export default React.memo(function Article(props) {
  const backLink = props.backLink || {}
  const authors = props.authors || [props.author]

  return (
    <article className={['Article', props.className].filter(Boolean).join(' ')}>
      <HeaderBanner title={props.title} background={props.background} />

      <p className='Article__meta'>
        <span className='Article__author'>
          Written by {authors.reduce(renderAuthorsLinks, [])}
        </span>
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
