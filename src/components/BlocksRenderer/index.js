import React from 'react'
import { PortableText } from '@portabletext/react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardLink from '~/components/CardLink'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Title from '~/components/Title'

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
  normal: 'p',
  // @TODO: add anchor.
  h2: Title,
  h3: 'h3',
}

const types = {
  info: props => (
    <Info icon={props.value.icon} title={props.value.title}>
      <BlocksRenderer value={props.value.content} />
    </Info>
  ),
  battleSim: props => (
    <BattleSimEmbed id={props.value.board}>
      <BlocksRenderer value={props.value.caption} />
    </BattleSimEmbed>
  ),
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
  <PortableText value={props.value} components={components} />
)

export default React.memo(BlocksRenderer)
