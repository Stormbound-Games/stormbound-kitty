import React from 'react'
import './index.css'

const QuestionMark = React.forwardRef((props, ref) => (
  <span ref={ref} {...props} className='QuestionMark'>
    ?
  </span>
))

export default QuestionMark
