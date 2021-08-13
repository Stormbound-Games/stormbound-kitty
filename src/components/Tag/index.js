import React from 'react'
import { TAGS } from '../../constants/deck'

export default React.memo(function Tag(props) {
  return <span className='Highlight'>{TAGS[props.children]}</span>
})
