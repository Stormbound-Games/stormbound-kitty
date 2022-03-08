import React from 'react'

export default React.memo(function Tags(props) {
  if (!props.tags || props.tags.length === 0) return null

  return props.tags.reduce(
    (acc, tag, index, arr) => (
      <>
        {acc}
        {index === 0 ? '' : index === arr.length - 1 ? ' and' : ','}{' '}
        <span className='Highlight'>{tag.name || tag}</span>
      </>
    ),
    <></>
  )
})
