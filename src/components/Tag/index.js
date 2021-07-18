import React from 'react'
import { TAGS } from '../../constants/deck'

const Tag = props => {
  return <span className='Highlight'>{TAGS[props.children]}</span>
}

export default React.memo(Tag)
