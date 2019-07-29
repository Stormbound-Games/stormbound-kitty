import React from 'react'
import { TAGS, CATEGORIES } from '../../constants/decks'
import Checkbox from '../Checkbox'
import TogglableContent from '../TogglableContent'
import CardSelect from '../CardSelect'
import Row from '../Row'
import Column from '../Column'
import FactionSelect from '../FactionSelect'
import './index.css'

const DBSuggestionsFilters = props => {
  const [areFiltersExpanded, expandFilters] = React.useState(false)
  const [name, updateName] = React.useState(props.name)

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
          <fieldset>
            <TogglableContent
              isExpanded={areFiltersExpanded}
              id="suggestions-filters"
              renderToggle={toggleProps => (
                <legend>
                  <button
                    {...toggleProps}
                    type="button"
                    className="DBSuggestionsFilters__toggle"
                    onClick={() => expandFilters(s => !s)}
                  >
                    {areFiltersExpanded ? '- Hide tags' : '+ Show tags'}
                  </button>
                </legend>
              )}
            >
              {Object.keys(TAGS).map(tag => (
                <Checkbox
                  key={tag}
                  id={tag}
                  value={tag}
                  name="tags"
                  checked={props.tags.includes(tag)}
                  onChange={event => {
                    if (props.tags.includes(event.target.value)) {
                      props.updateTags(props.tags.filter(r => r !== tag))
                    } else {
                      props.updateTags([...props.tags, tag])
                    }
                  }}
                >
                  {TAGS[tag].name}
                  <span className="DBSuggestionsFilters__info">
                    {TAGS[tag].description}
                  </span>
                </Checkbox>
              ))}
            </TogglableContent>
          </fieldset>
        </Column>
      </Row>
    </form>
  )
}

export default DBSuggestionsFilters
