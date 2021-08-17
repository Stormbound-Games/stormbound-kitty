import React from 'react'
import DECKS from '~/data/decks'
import { CollectionContext } from '~/components/CollectionProvider'
import CardSelect from '~/components/CardSelect'
import CTA from '~/components/CTA'
import FactionSelect from '~/components/FactionSelect'
import Input from '~/components/Input'
import MobileTogglableContent from '~/components/MobileTogglableContent'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import TagsSelect from '~/components/TagsSelect'

const getAuthors = () => {
  const authors = []

  DECKS.forEach(deck => {
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
    >
      <form onSubmit={event => event.preventDefault()}>
        <Row>
          <Row.Column>
            <TagsSelect
              tags={props.tags}
              updateTags={props.updateTags}
              id='tags'
              name='tags'
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
            <Select
              label='Author'
              id='author'
              value={props.author}
              onChange={event => props.updateAuthor(event.target.value)}
            >
              <option value='*'>Any</option>
              {authors.map(author => (
                <option value={author} key={author}>
                  {author}
                </option>
              ))}
            </Select>
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <Input
              label='Name'
              type='search'
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
            <CardSelect
              label='Including card'
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
            <Select
              label='Order'
              id='order'
              value={props.order}
              onChange={event => props.updateOrder(event.target.value)}
            >
              <option value='DATE'>Most recent</option>
              <option value='FACTION'>Faction</option>
              <option value='FEASIBILITY' disabled={hasDefaultCollection}>
                Feasibility
              </option>
            </Select>
          </Row.Column>
          <Row.Column extend={{ alignSelf: 'flex-end' }}>
            <Spacing bottom={['LARGE', 'NONE']}>
              <CTA
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
            </Spacing>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
