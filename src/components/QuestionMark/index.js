import React from 'react'
import './index.css'

export default React.forwardRef(function QuestionMark(props, ref) {
  return (
    <span ref={ref} {...props} className='QuestionMark'>
      ?
    </span>
  )
})
