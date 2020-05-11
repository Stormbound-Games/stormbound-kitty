import React from 'react'
import { CATEGORIES } from '../../constants/decks'
import { BRAWLS } from '../../constants/brawl'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import CardSelect from '../CardSelect'
import Column from '../Column'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
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

export default React.memo(function DeckBuilderSuggestionsFilters(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const [name, updateName] = React.useState(props.name)
  const authors = React.useMemo(getAuthors)

  return (
    <MobileTogglableContent
      id='deck-suggestions'
      withSymbols
      labelCollapsed='Expand deck suggestions'
      labelExpanded='Collapse deck suggestions'
      className='DeckBuilderSuggestionsFilters__toggle'
    >
      <form
        onSubmit={event => event.preventDefault()}
        className='DeckBuilderSuggestionsFilters'
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
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              name='category'
              value={props.category}
              onChange={event => props.updateCategory(event.target.value)}
            >
              <option value='*'>Any</option>
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
              placeholder='e.g. Let It Go'
            />
          </Column>
          <Column>
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
          </Column>
        </Row>

        <Row>
          <Column>
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
          </Column>
          <Column>
            <label htmlFor='brawl-modifier'>Brawl</label>
            <select
              id='brawl-modifier'
              name='brawl-modifier'
              value={props.brawl}
              onChange={event => props.updateBrawl(event.target.value)}
              disabled={props.category !== 'BRAWL'}
            >
              <option value='*'>Any</option>
              {BRAWLS.map(brawl => (
                <option value={brawl.id} key={brawl.id}>
                  {brawl.label}
                </option>
              ))}
            </select>
          </Column>
        </Row>
        <Row>
          <Column>
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
          </Column>
          <Column style={{ alignSelf: 'flex-end' }}>
            <CTA
              disabled={
                props.author === '*' &&
                props.category === '*' &&
                props.faction === '*' &&
                props.brawl === '*' &&
                !props.including &&
                !props.name
              }
              onClick={props.resetFilters}
            >
              Reset
            </CTA>
          </Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
