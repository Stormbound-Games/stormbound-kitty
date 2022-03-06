import React from 'react'
import { CollectionContext } from '~/components/CollectionProvider'
import CardSelect from '~/components/CardSelect'
import CTA from '~/components/CTA'
import FactionSelect from '~/components/FactionSelect'
import Input from '~/components/Input'
import MobileTogglableContent from '~/components/MobileTogglableContent'
import Row from '~/components/Row'
import Select from '~/components/Select'
import TagsSelect from '~/components/TagsSelect'

const getAuthors = decks => {
  const authors = []
  const set = new Set()

  decks.forEach(deck => {
    if (!set.has(deck.author.slug)) {
      authors.push(deck.author)
      set.add(deck.author.slug)
    }
  })

  return authors.sort((a, b) => a.name.localeCompare(b.name))
}

export default React.memo(function FeaturedDecksFilters(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const authors = React.useMemo(() => getAuthors(props.decks), [props.decks])

  return (
    <MobileTogglableContent label='Display deck filters'>
      <form onSubmit={event => event.preventDefault()}>
        <Row withNarrowGutter>
          <Row.Column>
            <TagsSelect
              availableTags={props.availableTags}
              tags={props.tags}
              updateTags={props.updateTags}
              id='tags'
              name='tags'
            />
          </Row.Column>
        </Row>

        <Row withNarrowGutter>
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
              value={props.author.slug}
              onChange={event => props.updateAuthor(event.target.value)}
              data-testid='filter-author'
            >
              <option value='*'>Any</option>
              {authors.map(author => (
                <option value={author.slug} key={author.slug}>
                  {author.name}
                </option>
              ))}
            </Select>
          </Row.Column>
        </Row>

        <Row withNarrowGutter>
          <Row.Column>
            <Input
              label='Name'
              type='search'
              id='name'
              value={props.name}
              onChange={event => props.updateName(event.target.value)}
              placeholder='e.g. Reckless Rush'
              data-testid='filter-name'
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

        <Row withNarrowGutter>
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
            <CTA
              type='button'
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
