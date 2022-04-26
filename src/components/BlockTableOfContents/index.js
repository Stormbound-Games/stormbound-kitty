import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import { RichTextContext } from '~/components/BlocksRenderer'
import TableOfContents from '~/components/TableOfContents'
import findHeadings from '~/helpers/findHeadings'
import styles from './styles'

const ToCItem = props => {
  const { css } = useFela()

  return (
    <li className={css(styles.item)}>
      <Link href={'#' + props.id}>{props.text}</Link>
      {props.children}
    </li>
  )
}

export default React.memo(function BlockTableOfContents(props) {
  const { css } = useFela()
  const { ast } = React.useContext(RichTextContext)
  const headings = findHeadings(ast, props.value.deep)

  return (
    <TableOfContents extend={styles.list}>
      {headings.map(heading => (
        <ToCItem key={heading._key} {...heading} extend={styles.item}>
          {heading.subtitles ? (
            <ol className={css(styles.list, styles.nestedList)}>
              {heading.subtitles.map(subtitle => (
                <ToCItem key={subtitle._key} {...subtitle} />
              ))}
            </ol>
          ) : null}
        </ToCItem>
      ))}
    </TableOfContents>
  )
})
