import React from 'react'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import Input from '~/components/Input'
import FactionSelect from '~/components/FactionSelect'
import MobileTogglableContent from '~/components/MobileTogglableContent'
import Row from '~/components/Row'
import Select from '~/components/Select'
import TagsSelect from '~/components/TagsSelect'

export default React.memo(function YourDecksFilters(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const updateTags = tags => props.setFilters(filters => ({ ...filters, tags }))
  const updateName = name => props.setFilters(filters => ({ ...filters, name }))
  const updateFaction = faction =>
    props.setFilters(filters => ({ ...filters, faction }))
  const updateOrder = order =>
    props.setFilters(filters => ({ ...filters, order }))

  if (decks.length < 2) return null

  return (
    <MobileTogglableContent label='Display deck filters'>
      <form onSubmit={event => event.preventDefault()}>
        <Row withNarrowGutter>
          <Row.Column>
            <Input
              label='Name'
              type='search'
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
            <TagsSelect
              availableTags={props.availableTags}
              tags={props.tags}
              updateTags={updateTags}
              id='tags'
            />
          </Row.Column>
        </Row>

        <Row withNarrowGutter>
          <Row.Column>
            <FactionSelect
              value={props.faction}
              onChange={event => updateFaction(event.target.value)}
              data-testid='decks-faction-select'
              withAny
            />
          </Row.Column>
          <Row.Column>
            <Select
              label='Order'
              id='order'
              value={props.order}
              onChange={event => updateOrder(event.target.value)}
            >
              <option value='DATE'>Chronological</option>
              <option value='FACTION'>Faction</option>
              <option value='NAME'>Name</option>
            </Select>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
