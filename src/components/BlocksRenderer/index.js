import React from 'react'
import { PortableText } from '@portabletext/react'
import CardLink from '~/components/CardLink'
import Link from '~/components/Link'
import Spacing from '~/components/Spacing'

// See: https://github.com/sanity-io/block-content-to-hyperscript/blob/d9d5adac36d50c0c012f7bb4099fb6f3fa67b382/src/serializers.js#L57-L58
const Block = props => {
  if (props.children.every(node => !node)) {
    return null
  }

  return (
    <Spacing as='p' bottom='LARGE' extend={{ whiteSpace: 'pre-line' }}>
      {props.children}
    </Spacing>
  )
}

// See: https://github.com/sanity-io/block-content-to-hyperscript/blob/d9d5adac36d50c0c012f7bb4099fb6f3fa67b382/src/serializers.js#L39-L40
const List = props => {
  const Element = props.value.listItem === 'bullet' ? 'ul' : 'ol'
  return <Element>{props.children}</Element>
}

// See: https://github.com/sanity-io/block-content-to-hyperscript/blob/d9d5adac36d50c0c012f7bb4099fb6f3fa67b382/src/serializers.js#L45-L46
const ListItem = props => {
  return (
    <Spacing as='li' bottom='SMALL'>
      {props.children}
    </Spacing>
  )
}

// See: https://github.com/sanity-io/block-content-to-hyperscript/blob/d9d5adac36d50c0c012f7bb4099fb6f3fa67b382/src/serializers.js#L88
const LinkBlock = props => {
  const prop = props.value.href.startsWith('http') ? 'href' : 'to'
  const linkProp = { [prop]: props.value.href }

  return <Link {...linkProp}>{props.children}</Link>
}

const CardLinkBlock = props => {
  return (
    <CardLink id={props.value.id}>
      {props.children.length === 1 && props.children[0] === props.value.id
        ? undefined
        : props.children}
    </CardLink>
  )
}

const Strong = props => <strong>{props.children}</strong>
const Code = props => <code>{props.children}</code>

const components = {
  types: {
    block: Block,
  },
  marks: {
    strong: Strong,
    code: Code,
    link: LinkBlock,
    cardLink: CardLinkBlock,
    // Text should not be underlined if it’s not a link.
    underline: props => props.children,
  },
  list: List,
  listItem: ListItem,
  empty: null,
}

const BlocksRenderer = props => (
  <PortableText value={props.value} components={components} />
)

export default React.memo(BlocksRenderer)
