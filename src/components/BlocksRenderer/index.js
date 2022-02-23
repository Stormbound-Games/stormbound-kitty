import React from 'react'
import speakingurl from 'speakingurl'
import { PortableText } from '@portabletext/react'
import BattleSimEmbed from '~/components/BattleSimEmbed'
import CardLink from '~/components/CardLink'
import Info from '~/components/Info'
import Link from '~/components/Link'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

const RichTextContext = React.createContext({ ast: {} })

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

const getText = props =>
  props.children
    .map(node => (typeof node === 'string' ? node : node.text || ''))
    .join('')

const findHeadings = (ast, deep = false) => {
  return ast.reduce((acc, node) => {
    if (node.style === 'h2') {
      const text = getText(node)
      const id = speakingurl(text)
      acc.push({ _key: node._key, text, id, subtitles: [] })
    } else if (deep && node.style === 'h3' && acc.length) {
      const parent = acc.pop()
      const text = getText(node)
      const id = speakingurl(text)
      parent.subtitles.push({ _key: node._key, text, id })
      acc.push(parent)
    } else if (node.children) acc.push(...findHeadings(node.children))
    return acc
  }, [])
}

const asHeading = Component =>
  function Heading(props) {
    if (!props.children) return null

    const text = getText(props)
    const id = speakingurl(text)

    return <Component id={id}>{props.children}</Component>
  }

const block = {
  normal: props => (props.children ? <p>{props.children}</p> : null),
  h2: asHeading(Title),
  h3: asHeading('h3'),
}

const ToCItem = props => (
  <li>
    <Link href={'#' + props.id}>{props.text}</Link>
    {props.children}
  </li>
)

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
  tableOfContents: function Toc(props) {
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
  },
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
