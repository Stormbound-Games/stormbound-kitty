import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import remark from 'remark'
import remarkReact from 'remark-react'
import Title from '../Title'
import Hint from '../Hint'
import WikiLink from '../WikiLink'
import template from '../../helpers/template'
import cards from '../../data/cards'

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

const generateId = content =>
  content
    .toLowerCase()
    .replace(/['’,]/g, '')
    .replace(/[\s/]+/g, '-')

const h1 = props => <Title element="h1">{props.children}</Title>
const h2 = props => (
  <Title element="h2" id={generateId(props.children[0])}>
    {props.children}
  </Title>
)
const h3 = props => <h3 id={generateId(props.children[0])}>{props.children}</h3>
const p = props =>
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
const li = props => (
  <li>
    {props.children.map(child =>
      typeof child === 'string'
        ? template(tokenizeCardsNames(child), REPLACEMENTS)
        : child
    )}
  </li>
)
const a = props =>
  props.href.startsWith('/') ? (
    <Link to={props.href}>{props.children}</Link>
  ) : (
    <a href={props.href}>{props.children}</a>
  )

const Markdown = props => {
  return (
    <Fragment>
      {
        remark()
          .use(remarkReact, {
            remarkReactComponents: { h1, h2, h3, p, li, a }
          })
          .processSync(props.source).contents
      }
    </Fragment>
  )
}

export default Markdown
