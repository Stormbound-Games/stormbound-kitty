import React from 'react'
import { PortableText } from '@portabletext/react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardLink from '~/components/CardLink'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Title from '~/components/Title'
import TableOfContents from './ToC'
import Imagery from './Imagery'
import asHeading from './Heading'

export const RichTextContext = React.createContext({ ast: {} })

const marks = {
  strong: ({ children }) => <strong>{children}</strong>,
  code: ({ children }) => <code>{children}</code>,
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
  normal: ({ children }) => <p>{children}</p>,
  h2: asHeading(Title),
  h3: asHeading('h3'),
}

const types = {
  info: ({ value }) => (
    <Info icon={value.icon} title={value.title}>
      <BlocksRenderer value={value.content} />
    </Info>
  ),
  battleSim: ({ value }) => (
    <BattleSimEmbed id={value.board}>
      <BlocksRenderer value={value.caption} />
    </BattleSimEmbed>
  ),
  tableOfContents: TableOfContents,
  imagery: Imagery,
}

const components = {
  types,
  block,
  marks,
  list: { bullet: 'ul', number: 'ol' },
  listItem: { bullet: 'li', number: 'li' },
  empty: null,
}

const BlocksRenderer = props => (
  // The table of contents block needs to have access to the AST in order to
  // find all the headings.
  <RichTextContext.Provider value={{ ast: props.value }}>
    <PortableText value={props.value} components={components} />
  </RichTextContext.Provider>
)

export default React.memo(BlocksRenderer)
