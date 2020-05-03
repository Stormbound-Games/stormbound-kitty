import React from 'react'
import { Link } from 'react-router-dom'
import remark from 'remark'
import remarkReact from 'remark-react'
import cards from '../../data/cards'
import Hint from '../Hint'
import Title from '../Title'
import WikiLink from '../WikiLink'
import generateId from '../../helpers/generateId'
import template from '../../helpers/template'

const REPLACEMENTS = cards.reduce((acc, card, index) => {
  acc[card.name] = <WikiLink id={card.id} key={card.id} />
  return acc
}, {})

const TOKENS = cards.reduce((acc, card) => {
  acc[card.name] = '{{' + card.name + '}}'
  return acc
}, {})

const TOKEN_RE = new RegExp(
  Object.keys(TOKENS)
    .map(key => key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
    .join('|'),
  'g'
)

const tokenizeCardsNames = string =>
  string.replace(TOKEN_RE, word => TOKENS[word])

const h1 = React.memo(props => <Title element='h1'>{props.children}</Title>)
const h2 = React.memo(props => (
  <Title element='h2' id={generateId(props.children[0])}>
    {props.children}
  </Title>
))
const h3 = React.memo(props => (
  <h3 id={generateId(props.children[0])}>{props.children}</h3>
))
const p = React.memo(props =>
  typeof props.children[0] === 'string' &&
  props.children[0].startsWith('Hint: ') ? (
    <Hint>
      {props.children[0].replace('Hint: ', '')}
      {props.children.slice(1)}
    </Hint>
  ) : (
    <p>
      {props.children.map(child =>
        typeof child === 'string'
          ? template(tokenizeCardsNames(child), REPLACEMENTS)
          : child
      )}
    </p>
  )
)

const li = React.memo(props => (
  <li>
    {props.children.map(child =>
      typeof child === 'string'
        ? template(tokenizeCardsNames(child), REPLACEMENTS)
        : child
    )}
  </li>
))

const a = React.memo(props =>
  props.href.startsWith('/') ? (
    <Link to={props.href}>{props.children}</Link>
  ) : (
    <a href={props.href}>{props.children}</a>
  )
)

export default React.memo(function Markdown(props) {
  const options = { remarkReactComponents: { h1, h2, h3, p, li, a } }
  const processor = remark().use(remarkReact, options)
  const output = processor.processSync(props.source)

  return output.result
})
