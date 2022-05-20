import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import { RichTextContext } from '~/components/BlocksRenderer'
import TableOfContents from '~/components/TableOfContents'
import parseOutline from '~/helpers/parseOutline'
import styles from './styles'

const ToCItem = props => {
  const { css } = useFela()

  return (
    <li className={css(styles.item)}>
      <Link href={'#' + props.slug}>{props.text}</Link>
      {props.subheadings.length > 0 ? (
        <ol className={css(styles.list, styles.nestedList)}>
          {props.subheadings.map(subheading => (
            <ToCItem key={subheading._key} {...subheading} />
          ))}
        </ol>
      ) : null}
    </li>
  )
}

export default React.memo(function BlockTableOfContents(props) {
  const { ast } = React.useContext(RichTextContext)
  const headings = parseOutline(ast, props.value.deep)

  return (
    <TableOfContents extend={styles.list}>
      {headings.map(heading => (
        <ToCItem key={heading._key} {...heading} extend={styles.item} />
      ))}
    </TableOfContents>
  )
})
