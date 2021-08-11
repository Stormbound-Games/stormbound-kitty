import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import QuestionMark from '../QuestionMark'

export default React.memo(function LearnMoreIcon(props) {
  const { css } = useFela()
  return (
    <Link
      to={{ pathname: '/faq', hash: props.anchor }}
      className={css({ textDecoration: 'none' })}
    >
      <span className='VisuallyHidden'>
        {props.children || 'Learn more in the FAQ'}
      </span>
      <QuestionMark />
    </Link>
  )
})
