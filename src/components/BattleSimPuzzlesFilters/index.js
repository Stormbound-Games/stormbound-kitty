import React from 'react'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Checkbox from '../Checkbox'
import Column from '../Column'
import Row from '../Row'
import TogglableContent from '../TogglableContent'
import './index.css'

export default React.memo(function BattleSimPuzzlesFilters(props) {
  const [areFiltersExpanded, expandFilters] = React.useState(false)
  const updateDifficulty = props.updateFilter('difficulty')
  const updateName = props.updateFilter('name')
  const updateType = props.updateFilter('type')
  const updateRestrictions = props.updateFilter('restrictions')

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className='BattleSimPuzzlesFilters'
    >
      <Row>
        <Column>
          <label htmlFor='difficulty'>Difficulty</label>
          <select
            data-testid='difficulty-select'
            id='difficulty'
            name='difficulty'
            value={props.difficulty}
            onChange={event => updateDifficulty(event.target.value)}
          >
            <option value='*'>Any</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </Column>

        <Column>
          <label htmlFor='type'>Type</label>
          <select
            data-testid='type-select'
            id='type'
            name='type'
            value={props.type}
            onChange={event => updateType(event.target.value)}
          >
            <option value='*'>Any</option>
            {Object.keys(TYPES).map(type => (
              <option value={type} key={type}>
                {type.slice(0, 1) + type.toLowerCase().slice(1)}
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
            data-testid='name-input'
            value={props.name}
            onChange={event => updateName(event.target.value)}
            placeholder='e.g. Sneaky Outcasts'
          />
        </Column>
      </Row>

      <Row>
        <Column>
          <fieldset>
            <TogglableContent
              isExpanded={areFiltersExpanded}
              id='puzzles-filters'
              renderToggle={toggleProps => (
                <legend>
                  <button
                    {...toggleProps}
                    type='button'
                    className='BattleSimPuzzlesFilters__toggle'
                    onClick={() => expandFilters(s => !s)}
                  >
                    {areFiltersExpanded
                      ? '- Hide restrictions'
                      : '+ Show restrictions'}
                  </button>
                </legend>
              )}
            >
              {Object.keys(RESTRICTIONS).map(restriction => (
                <Checkbox
                  key={restriction}
                  id={restriction}
                  value={restriction}
                  name='restrictions'
                  checked={props.restrictions.includes(restriction)}
                  onChange={event => {
                    if (props.restrictions.includes(event.target.value)) {
                      updateRestrictions(
                        props.restrictions.filter(r => r !== restriction)
                      )
                    } else {
                      updateRestrictions([...props.restrictions, restriction])
                    }
                  }}
                  data-testid='restriction-checkbox'
                >
                  {RESTRICTIONS[restriction].name}
                  <span className='BattleSimPuzzlesFilters__info'>
                    {RESTRICTIONS[restriction].description}
                  </span>
                </Checkbox>
              ))}
            </TogglableContent>
          </fieldset>
        </Column>
      </Row>
    </form>
  )
})
