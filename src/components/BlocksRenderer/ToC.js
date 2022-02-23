import React from 'react'
import Link from '~/components/Link'
import TableOfContents from '~/components/TableOfContents'
import { RichTextContext } from './'
import { findHeadings } from './Heading'

const ToCItem = props => (
  <li>
    <Link href={'#' + props.id}>{props.text}</Link>
    {props.children}
  </li>
)

const ToC = props => {
  const { ast } = React.useContext(RichTextContext)
  const headings = findHeadings(ast, props.value.deep)

  return (
    <TableOfContents>
      {headings.map(heading => (
        <ToCItem key={heading._key} {...heading}>
          {heading.subtitles ? (
            <ol style={{ marginTop: 'var(--s-smaller)' }}>
              {heading.subtitles.map(subtitle => (
                <ToCItem key={subtitle._key} {...subtitle} />
              ))}
            </ol>
          ) : null}
        </ToCItem>
      ))}
    </TableOfContents>
  )
}

export default ToC
