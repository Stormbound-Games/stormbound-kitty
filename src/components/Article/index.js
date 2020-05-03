import React from 'react'
import { Link } from 'react-router-dom'
import HeaderBanner from '../HeaderBanner'
import Only from '../Only'
import Title from '../Title'
import './index.css'

export default React.memo(function Article(props) {
  const backLink = props.backLink || {}

  return (
    <article className={['Article', props.className].filter(Boolean).join(' ')}>
      <Only.Desktop>
        <HeaderBanner title={props.title} background={props.background} />
      </Only.Desktop>

      <Only.Mobile>
        <Title>{props.title}</Title>
      </Only.Mobile>

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

      <div className='Article__content'>{props.children}</div>
    </article>
  )
})
