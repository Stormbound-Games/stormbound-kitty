import React from 'react'
import Link from '../Link'
import QuestionMark from '../QuestionMark'
import VisuallyHidden from '../VisuallyHidden'

export default React.memo(function LearnMoreIcon(props) {
  return (
    <Link
      to={{ pathname: '/faq', hash: props.anchor }}
      extend={{ textDecoration: 'none' }}
    >
      <VisuallyHidden>
        {props.children || 'Learn more in the FAQ'}
      </VisuallyHidden>
      <QuestionMark />
    </Link>
  )
})
