import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import Error from '../Error'
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

class Markdown extends React.Component {
  state = {
    status: 'PRISTINE',
    error: false
  }

  componentDidMount() {
    this.setState({ status: 'LOADING' })

    Promise.all([import('remark'), import('remark-react')])
      .catch(error => {
        this.setState({ status: 'FAILURE', error })
      })
      .then(([remark, remarkReact]) => {
        this.remark = remark.default
        this.remarkReact = remarkReact.default
        this.setState({ status: 'SUCCESS' })
      })
  }

  render() {
    if (this.state.status === 'FAILURE') {
      return <Error error={this.state.error} />
    }

    if (this.state.status !== 'SUCCESS') {
      return null
    }

    const content = this.props.source
    const generateId = content =>
      content
        .toLowerCase()
        .replace(/['’,]/g, '')
        .replace(/[\s/]+/g, '-')

    return (
      <Fragment>
        {
          this.remark()
            .use(this.remarkReact, {
              remarkReactComponents: {
                h1: props => <Title element="h1">{props.children}</Title>,
                h2: props => (
                  <Title element="h2" id={generateId(props.children[0])}>
                    {props.children}
                  </Title>
                ),
                h3: props => (
                  <h3 id={generateId(props.children[0])}>{props.children}</h3>
                ),
                p: props =>
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
                  ),
                li: props => (
                  <li>
                    {props.children.map(child =>
                      typeof child === 'string'
                        ? template(tokenizeCardsNames(child), REPLACEMENTS)
                        : child
                    )}
                  </li>
                ),
                a: props =>
                  props.href.startsWith('/') ? (
                    <Link to={props.href}>{props.children}</Link>
                  ) : (
                    <a href={props.href}>{props.children}</a>
                  )
              }
            })
            .processSync(content).contents
        }
      </Fragment>
    )
  }
}

export default Markdown
