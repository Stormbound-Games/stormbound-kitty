import React, { Fragment } from 'react'
import { TAGS } from '../../constants/decks'
import './index.css'

const Tags = props => {
  if (props.tags.length === 0) {
    return null
  }

  return [...props.tags].sort().map((tag, index) => (
    <Fragment key={tag}>
      <span className="Tag" title={TAGS[tag].description}>
        {TAGS[tag].name}
      </span>
      {index !== props.tags.length - 1 && ', '}
    </Fragment>
  ))
}

Tags.defaultProps = {
  tags: []
}

export default Tags
