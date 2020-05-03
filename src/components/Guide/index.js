import React from 'react'
import Article from '../Article'
import PageMeta from '../PageMeta'
import getExcerpt from '../../helpers/getExcerpt'
import './index.css'

export default React.memo(function Guide(props) {
  return (
    <>
      <Article
        className='Guide'
        readingTime='30 minutes'
        author={props.author}
        title={props.name}
        background={props.background}
        backLink={{
          to: '/guides',
          children: 'Back to guides',
        }}
      >
        {props.children}
      </Article>

      <PageMeta
        author={props.author}
        title={props.name}
        image={props.background}
        description={getExcerpt(props.excerpt, 160)}
      />
    </>
  )
})
