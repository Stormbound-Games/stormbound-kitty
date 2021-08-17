import React from 'react'
import { useFela } from 'react-fela'
import Asterisk from '~/components/Asterisk'
import Link from '~/components/Link'
import Spacing from '~/components/Spacing'
import VisuallyHidden from '~/components/VisuallyHidden'

export const Footnote = React.memo(function Footnote(props) {
  return (
    <Link
      href={'#' + props.id}
      aria-describedby='footnotes'
      id={`${props.id}-ref`}
      extend={{ textDecoration: 'none' }}
    >
      {props.children}
      <Asterisk />
    </Link>
  )
})

export default React.memo(function Footnotes(props) {
  const { css } = useFela()

  return (
    <Spacing top='LARGEST'>
      <footer className={css({ fontSize: '90%' })}>
        <VisuallyHidden as='h2' id='footnotes'>
          Footnotes
        </VisuallyHidden>
        {props.children}
      </footer>
    </Spacing>
  )
})
