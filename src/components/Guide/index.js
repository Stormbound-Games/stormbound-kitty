import React from 'react'
import PageMeta from '../PageMeta'
import Title from '../Title'
import './index.css'

export default React.memo(function Guide(props) {
  return (
    <div className={`Guide ${props.className}`}>
      <Title element='h1'>{props.title}</Title>
      <p className='Guide__author'>
        This guide has been authored by {props.author} and is published here
        with their consent. All credits to the original author.
      </p>

      {props.children}

      <PageMeta title={props.title} description={props.description} />
    </div>
  )
})
