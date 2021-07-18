import React from 'react'
import Select from 'react-select'
import { TAGS } from '../../constants/deck'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import useSelectStyles from '../../hooks/useSelectStyles'
import './index.css'

export default React.memo(function YourDecksFilters(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const styles = useSelectStyles()
  const updateTags = tags => props.setFilters(filters => ({ ...filters, tags }))
  const updateName = name => props.setFilters(filters => ({ ...filters, name }))
  const updateFaction = faction =>
    props.setFilters(filters => ({ ...filters, faction }))
  const updateOrder = order =>
    props.setFilters(filters => ({ ...filters, order }))

  if (decks.length < 2) return null

  return (
    <MobileTogglableContent
      id='deck-filters'
      withSymbols
      labelCollapsed='Expand deck filters'
      labelExpanded='Collapse deck filters'
      className='YourDecksFilters__toggle'
    >
      <form
        onSubmit={event => event.preventDefault()}
        className='YourDecksFilters'
      >
        <Row>
          <Row.Column>
            <label htmlFor='name'>Name</label>
            <input
              type='search'
              name='name'
              id='name'
              value={props.name}
              onChange={event => updateName(event.target.value)}
              placeholder='e.g. Reckless Rush'
              data-testid='decks-name-input'
            />
          </Row.Column>
        </Row>
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
                updateTags(options.map(option => option.value))
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
              onChange={event => updateFaction(event.target.value)}
              data-testid='decks-faction-select'
              withAny
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='order'>Order</label>
            <select
              id='order'
              name='order'
              value={props.order}
              onChange={event => updateOrder(event.target.value)}
            >
              <option value='DATE'>Chronological</option>
              <option value='FACTION'>Faction</option>
              <option value='NAME'>Name</option>
            </select>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
