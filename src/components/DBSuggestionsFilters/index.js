import React from 'react'
import { CATEGORIES } from '../../constants/decks'
import CardSelect from '../CardSelect'
import CTA from '../CTA'
import Row from '../Row'
import Column from '../Column'
import FactionSelect from '../FactionSelect'
import decks from '../../data/decks'
import './index.css'

const getAuthors = () => {
  const authors = []

  decks.forEach(deck => {
    if (!authors.includes(deck.author)) authors.push(deck.author)
  })

  return authors.sort((a, b) =>
    a.toLowerCase() < b.toLowerCase()
      ? -1
      : a.toLowerCase() > b.toLowerCase()
      ? +1
      : 0
  )
}

const DBSuggestionsFilters = props => {
  const [name, updateName] = React.useState(props.name)
  const authors = React.useMemo(getAuthors)

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="DBSuggestionsFilters"
    >
      <Row>
        <Column>
          <FactionSelect
            value={props.faction}
            onChange={event => props.updateFaction(event.target.value)}
            withAny
          />
        </Column>
        <Column>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={props.category}
            onChange={event => props.updateCategory(event.target.value)}
          >
            <option value="*">Any</option>
            {Object.keys(CATEGORIES).map(category => (
              <option value={category} key={category}>
                {CATEGORIES[category]}
              </option>
            ))}
          </select>
        </Column>
      </Row>

      <Row>
        <Column>
          <label htmlFor="name">Name</label>
          <input
            type="search"
            name="name"
            id="name"
            value={name}
            onChange={event => {
              updateName(event.target.value)
              props.updateName(event.target.value)
            }}
            placeholder="e.g. Let It Go"
          />
        </Column>
        <Column>
          <label htmlFor="including">Including card</label>
          <CardSelect
            name="including"
            id="including"
            current={props.including}
            onChange={option => {
              props.updateIncluding(option ? option.value : null)
            }}
            withSpells={true}
          />
        </Column>
      </Row>

      <Row>
        <Column>
          <label htmlFor="author">Author</label>
          <select
            id="author"
            name="author"
            value={props.author}
            onChange={event => props.updateAuthor(event.target.value)}
          >
            <option value="*">Any</option>
            {authors.map(author => (
              <option value={author} key={author}>
                {author}
              </option>
            ))}
          </select>
        </Column>
        <Column style={{ alignSelf: 'flex-end' }}>
          <CTA onClick={props.resetFilters}>Reset</CTA>
        </Column>
      </Row>
    </form>
  )
}

export default DBSuggestionsFilters
