import React from 'react'
import { useFela } from 'react-fela'
import Asterisk from '../Asterisk'
import Link from '../Link'
import Spacing from '../Spacing'
import VisuallyHidden from '../VisuallyHidden'

export const Footnote = props => (
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

const Footnotes = props => {
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
}

export default React.memo(Footnotes)
