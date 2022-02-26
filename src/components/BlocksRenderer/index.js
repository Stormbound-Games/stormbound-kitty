import React from 'react'
import { PortableText } from '@portabletext/react'
import CardLink from '~/components/CardLink'
import Link from '~/components/Link'
import BlockBattleSim from '~/components/BlockBattleSim'
import BlockCard from '~/components/BlockCard'
import BlockCheapenedBrawl from '~/components/BlockCheapenedBrawl'
import BlockColumns from '~/components/BlockColumns'
import BlockDeck from '~/components/BlockDeck'
import BlockFAQ from '~/components/BlockFAQ'
import BlockImage from '~/components/BlockImage'
import BlockInfo from '~/components/BlockInfo'
import BlockManaGraph from '~/components/BlockManaGraph'
import BlockNerfCompensation from '~/components/BlockNerfCompensation'
import BlockNotice from '~/components/BlockNotice'
import BlockTable from '~/components/BlockTable'
import BlockTableOfContents from '~/components/BlockTableOfContents'
import BlockTierList from '~/components/BlockTierList'
import Embellish from '~/components/Embellish'
import asHeading from '~/components/BlockHeading'
import Sparkles from '~/components/Sparkles'
import Strikethrough from '~/components/Strikethrough'
import Title from '~/components/Title'

export const RichTextContext = React.createContext({
  ast: {},
  isInColumn: false,
})

const marks = {
  strong: props => <strong>{props.children}</strong>,
  code: props => <code>{props.children}</code>,
  'strike-through': props => <Strikethrough>{props.children}</Strikethrough>,
  sparkles: props => <Sparkles>{props.children}</Sparkles>,
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
  normal: ({ children }) => {
    if (
      Array.isArray(children) &&
      (children.length === 0 || children.every(child => !child))
    )
      return null

    return children ? <Embellish as='p'>{children}</Embellish> : null
  },
  notice: BlockNotice,
  h2: asHeading(Title),
  h3: asHeading('h3'),
}

const types = {
  battleSim: BlockBattleSim,
  card: BlockCard,
  cheapenedBrawl: BlockCheapenedBrawl,
  columns: BlockColumns,
  deckEmbed: BlockDeck,
  faq: BlockFAQ,
  image: BlockImage,
  info: BlockInfo,
  manaGraph: BlockManaGraph,
  nerfCompensation: BlockNerfCompensation,
  table: BlockTable,
  tableOfContents: BlockTableOfContents,
  tierList: BlockTierList,
}

const COMPONENTS = {
  types,
  block,
  marks,
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <Embellish as='li'>{children}</Embellish>,
    number: ({ children }) => <Embellish as='li'>{children}</Embellish>,
  },
  empty: null,
}

export default React.memo(function BlocksRenderer(props) {
  // The table of contents block needs to have access to the AST in order to
  // find all the headings.
  return (
    <RichTextContext.Provider
      value={{ ast: props.value, isInColumn: props.isInColumn || false }}
    >
      <PortableText value={props.value} components={COMPONENTS} />
    </RichTextContext.Provider>
  )
})
