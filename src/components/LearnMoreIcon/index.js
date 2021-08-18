import React from 'react'
import Link from '~/components/Link'
import QuestionMark from '~/components/QuestionMark'
import VisuallyHidden from '~/components/VisuallyHidden'

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
