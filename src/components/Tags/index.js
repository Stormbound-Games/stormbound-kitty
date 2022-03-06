import React from 'react'
import { TAGS } from '~/constants/deck'

export default React.memo(function Tags(props) {
  if (!props.tags || props.tags.length === 0) return null

  // Default to the base tags (without the Brawl ones), in case available tags
  // are not passed.
  const availableTags = props.availableTags || TAGS

  return props.tags.reduce(
    (acc, tag, index, arr) => (
      <>
        {acc}
        {index === 0 ? '' : index === arr.length - 1 ? ' and' : ','}{' '}
        <span className='Highlight'>{availableTags[tag] || tag}</span>
      </>
    ),
    <></>
  )
})
