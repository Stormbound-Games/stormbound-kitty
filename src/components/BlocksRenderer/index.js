import React from 'react'
import { PortableText } from '@portabletext/react'
import CardLink from '~/components/CardLink'
import Link from '~/components/Link'
import BlockBattleSim from '~/components/BlockBattleSim'
import BlockColumns from '~/components/BlockColumns'
import BlockInfo from '~/components/BlockInfo'
import BlockTableOfContents from '~/components/BlockTableOfContents'
import asHeading from '~/components/BlockHeading'
import Title from '~/components/Title'

export const RichTextContext = React.createContext({ ast: {} })

const marks = {
  strong: props => <strong>{props.children}</strong>,
  code: props => <code>{props.children}</code>,
  link: ({ value, children }) => (
    <Link
      {...{
        [value.href.startsWith('http') ? 'href' : 'to']: value.href,
      }}
    >
      {children}
    </Link>
  ),
  cardLink: ({ value, children }) => (
    <CardLink id={value.cardId || value.id}>{children}</CardLink>
  ),
  // Text should not be underlined if it’s not a link.
  underline: props => props.children,
}

const block = {
  normal: props => (props.children ? <p>{props.children}</p> : null),
  h2: asHeading(Title),
  h3: asHeading('h3'),
}

const types = {
  columns: BlockColumns,
  info: BlockInfo,
  battleSim: BlockBattleSim,
  tableOfContents: BlockTableOfContents,
}

const COMPONENTS = {
  types,
  block,
  marks,
  list: { bullet: 'ul', number: 'ol' },
  listItem: { bullet: 'li', number: 'li' },
  empty: null,
}

export default React.memo(function BlocksRenderer(props) {
  // The table of contents block needs to have access to the AST in order to
  // find all the headings.
  return (
    <RichTextContext.Provider value={{ ast: props.value }}>
      <PortableText value={props.value} components={COMPONENTS} />
    </RichTextContext.Provider>
  )
})
