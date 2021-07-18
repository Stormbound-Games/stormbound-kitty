import React from 'react'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import CardSelect from '../CardSelect'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import TagsSelect from '../TagsSelect'
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

export default React.memo(function DeckSuggestionsFilters(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const [name, updateName] = React.useState(props.name)
  const authors = React.useMemo(getAuthors, [])

  return (
    <MobileTogglableContent
      id='deck-suggestions'
      withSymbols
      labelCollapsed='Expand deck filters'
      labelExpanded='Collapse deck filters'
      className='DeckSuggestionsFilters__toggle'
    >
      <form
        onSubmit={event => event.preventDefault()}
        className='DeckSuggestionsFilters'
      >
        <Row>
          <Row.Column>
            <TagsSelect tags={props.tags} updateTags={props.updateTags} />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <FactionSelect
              value={props.faction}
              onChange={event => props.updateFaction(event.target.value)}
              withAny
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='author'>Author</label>
            <select
              id='author'
              name='author'
              value={props.author}
              onChange={event => props.updateAuthor(event.target.value)}
            >
              <option value='*'>Any</option>
              {authors.map(author => (
                <option value={author} key={author}>
                  {author}
                </option>
              ))}
            </select>
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <label htmlFor='name'>Name</label>
            <input
              type='search'
              name='name'
              id='name'
              value={name}
              onChange={event => {
                updateName(event.target.value)
                props.updateName(event.target.value)
              }}
              placeholder='e.g. Reckless Rush'
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='including'>Including card</label>
            <CardSelect
              name='including'
              id='including'
              current={props.including}
              onChange={option => {
                props.updateIncluding(option ? option.value : null)
              }}
              withSpells
              withClear
            />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <label htmlFor='order'>Order</label>
            <select
              id='order'
              name='order'
              value={props.order}
              onChange={event => props.updateOrder(event.target.value)}
            >
              <option value='DATE'>Most recent</option>
              <option value='FACTION'>Faction</option>
              <option value='FEASIBILITY' disabled={hasDefaultCollection}>
                Feasibility
              </option>
            </select>
          </Row.Column>
          <Row.Column>
            <CTA
              className='DeckSuggestionsFilters__CTA'
              disabled={
                props.author === '*' &&
                props.tags.length === 0 &&
                props.faction === '*' &&
                !props.including &&
                !props.name
              }
              onClick={props.resetFilters}
            >
              Reset
            </CTA>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
