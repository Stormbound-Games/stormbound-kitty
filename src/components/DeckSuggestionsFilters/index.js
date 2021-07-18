import React from 'react'
import Select from 'react-select'
import { TAGS } from '../../constants/deck'
import { BRAWLS } from '../../constants/brawl'
import decks from '../../data/decks'
import { CollectionContext } from '../CollectionProvider'
import CardSelect from '../CardSelect'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import useSelectStyles from '../../hooks/useSelectStyles'
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
  const styles = useSelectStyles()

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
            <label htmlFor='tags'>Tags</label>
            <Select
              styles={styles}
              id='tags'
              name='tags'
              value={props.tags.map(value => ({ value, label: TAGS[value] }))}
              isMulti
              onChange={options =>
                props.updateTags(options.map(option => option.value))
              }
              options={Object.entries(TAGS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
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
            <label htmlFor='brawl-modifier'>Brawl</label>
            <select
              id='brawl-modifier'
              name='brawl-modifier'
              value={props.brawl}
              onChange={event => props.updateBrawl(event.target.value)}
              disabled={!props.tags.includes('BRAWL')}
            >
              <option value='*'>Any</option>
              {BRAWLS.map(brawl => (
                <option value={brawl.id} key={brawl.id}>
                  {brawl.label}
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
        </Row>
        <CTA
          className='DeckSuggestionsFilters__CTA'
          disabled={
            props.author === '*' &&
            props.tags.length === 0 &&
            props.faction === '*' &&
            props.brawl === '*' &&
            !props.including &&
            !props.name
          }
          onClick={props.resetFilters}
        >
          Reset
        </CTA>
      </form>
    </MobileTogglableContent>
  )
})
