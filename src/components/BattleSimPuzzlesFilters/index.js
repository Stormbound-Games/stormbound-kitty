import React from 'react'
import { useFela } from 'react-fela'
import { RESTRICTIONS, CATEGORIES } from '../../constants/puzzles'
import Checkbox from '../Checkbox'
import Input from '../Input'
import Link from '../Link'
import Row from '../Row'
import Select from '../Select'
import TogglableContent from '../TogglableContent'
import useViewportSize from '../../hooks/useViewportSize'
import styles from './styles'

export default React.memo(function BattleSimPuzzlesFilters(props) {
  const { css } = useFela()
  const { viewportWidth } = useViewportSize()
  const [areFiltersExpanded, expandFilters] = React.useState(
    viewportWidth > 700
  )
  const updateDifficulty = props.updateFilter('difficulty')
  const updateName = props.updateFilter('name')
  const updateCategory = props.updateFilter('category')
  const updateRestrictions = props.updateFilter('restrictions')

  return (
    <form onSubmit={event => event.preventDefault()}>
      <Row>
        <Row.Column>
          <Select
            label='Difficulty'
            data-testid='difficulty-select'
            id='difficulty'
            value={props.difficulty}
            onChange={event => updateDifficulty(event.target.value)}
          >
            <option value='*'>Any</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </Row.Column>

        <Row.Column>
          <Select
            label='Category'
            data-testid='category-select'
            id='category'
            value={props.category}
            onChange={event => updateCategory(event.target.value)}
          >
            <option value='*'>Any</option>
            {Object.keys(CATEGORIES).map(type => (
              <option value={type} key={type}>
                {type.slice(0, 1) + type.toLowerCase().slice(1)}
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
            data-testid='name-input'
            value={props.name}
            onChange={event => updateName(event.target.value)}
            placeholder='e.g. Sneaky Outcasts'
          />
        </Row.Column>
      </Row>

      <Row>
        <Row.Column>
          <fieldset>
            <TogglableContent
              isExpanded={areFiltersExpanded}
              id='puzzles-filters'
              renderToggle={toggleProps => (
                <legend>
                  <Link
                    {...toggleProps}
                    extend={styles.toggle}
                    onClick={() => expandFilters(s => !s)}
                  >
                    {areFiltersExpanded
                      ? '- Hide restrictions'
                      : '+ Show restrictions'}
                  </Link>
                </legend>
              )}
            >
              {Object.keys(RESTRICTIONS).map(restriction => (
                <Checkbox
                  key={restriction}
                  id={restriction}
                  value={restriction}
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
                  <span className={css(styles.info)}>
                    {RESTRICTIONS[restriction].description}
                  </span>
                </Checkbox>
              ))}
            </TogglableContent>
          </fieldset>
        </Row.Column>
      </Row>
    </form>
  )
})
