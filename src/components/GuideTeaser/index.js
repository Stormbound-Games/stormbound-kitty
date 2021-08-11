import React from 'react'
import Teaser from '../Teaser'
import { renderAuthorsLinks } from '../PageHeaderMeta'

export default React.memo(function GuideTeaser(props) {
  const authors = props.authors.reduce(renderAuthorsLinks, [])

  return (
    <Teaser
      cardId={props.cardId}
      title={props.name}
      meta={<>Written by {authors}</>}
      excerpt={props.excerpt}
      to={'/guides/' + props.slug}
    />
  )
})
