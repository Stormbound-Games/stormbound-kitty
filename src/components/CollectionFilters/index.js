import React from 'react'
import { TYPES, RARITIES, RACES } from '../../constants/game'
import AdvancedCardSearch from '../AdvancedCardSearch'
import Checkbox from '../Checkbox'
import FactionSelect from '../FactionSelect'
import Icon from '../Icon'
import Only from '../Only'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import capitalise from '../../helpers/capitalise'
import './index.css'

const isButtonDisabled = props =>
  props.faction === '*' &&
  props.status === '*' &&
  props.level === '*' &&
  props.rarity === '*' &&
  props.type === '*' &&
  props.race === '*' &&
  !props.text &&
  !props.elder &&
  !props.hero &&
  props.order === 'NATURAL'

export default React.memo(function CollectionFilters(props) {
  if (props.advanced) {
    return (
      <AdvancedCardSearch
        onSubmit={props.runAdvancedSearch}
        value={props.search}
        setSearch={props.setAdvancedSearch}
        cancel={props.toggleAdvancedSearch}
      />
    )
  }

  return (
    <MobileTogglableContent
      id='collection-filters'
      withSymbols
      labelCollapsed='Expand collection filters'
      labelExpanded='Collapse collection filters'
      className='CollectionFilters__toggle'
    >
      <form
        className='CollectionFilters'
        onSubmit={event => event.preventDefault()}
      >
        <Row desktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <FactionSelect
                  value={props.faction}
                  onChange={event => props.setFaction(event.target.value)}
                  withNeutral
                  withAny
                  data-testid='faction-select'
                />
              </Row.Column>
              <Row.Column>
                <label htmlFor='type'>Type</label>
                <select
                  name='type'
                  id='type'
                  value={props.type}
                  onChange={event => props.setType(event.target.value)}
                  data-testid='type-select'
                >
                  <option value='*'>Any</option>
                  {Object.keys(TYPES).map(type => (
                    <option value={type} key={type}>
                      {capitalise(type)}
                    </option>
                  ))}
                </select>
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <label htmlFor='status'>Status</label>
                <select
                  name='status'
                  id='status'
                  value={props.status}
                  onChange={event => props.setStatus(event.target.value)}
                  data-testid='status-select'
                >
                  <option value='*'>Any</option>
                  <option value='MISSING'>Missing</option>
                  <option value='UPGRADABLE'>Upgradable</option>
                  <option value='EXCESS'>Excess copies</option>
                </select>
              </Row.Column>
              <Row.Column>
                <label htmlFor='level'>Level</label>
                <select
                  name='level'
                  id='level'
                  value={props.level}
                  onChange={event => props.setLevel(event.target.value)}
                  data-testid='level-select'
                >
                  <option value='*'>Any</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>

        <Row desktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <label htmlFor='rarity'>Rarity</label>
                <select
                  name='rarity'
                  id='rarity'
                  value={props.rarity}
                  onChange={event => props.setRarity(event.target.value)}
                  data-testid='rarity-select'
                >
                  <option value='*'>Any</option>
                  {Object.keys(RARITIES).map(rarity => (
                    <option value={rarity} key={rarity}>
                      {capitalise(rarity)}
                    </option>
                  ))}
                </select>
              </Row.Column>
              <Row.Column>
                <label htmlFor='race'>Race</label>
                <select
                  name='race'
                  id='race'
                  value={props.race}
                  onChange={event => props.setRace(event.target.value)}
                  data-testid='race-select'
                >
                  <option value='*'>Any</option>
                  {Object.keys(RACES).map(race => (
                    <option value={race} key={race}>
                      {capitalise(race)}
                    </option>
                  ))}
                </select>
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Only.CustomCollection>
                  <label htmlFor='order'>Order</label>
                  <select
                    name='order'
                    id='order'
                    value={props.order}
                    onChange={event => props.setOrder(event.target.value)}
                    data-testid='order-select'
                    disabled={props.status === 'EXCESS'}
                  >
                    <option value='NATURAL'>Natural</option>
                    <option value='VALUE'>Value</option>
                  </select>
                </Only.CustomCollection>
              </Row.Column>
              <Row.Column>
                <label htmlFor='text'>Text</label>
                <input
                  type='search'
                  name='text'
                  id='text'
                  value={props.text}
                  onChange={event => props.setText(event.target.value)}
                  placeholder='e.g. ‘Faun’ or ‘poison’'
                  data-testid='name-input'
                />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>

        <Row desktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Checkbox
                  id='elder'
                  checked={props.elder}
                  onChange={event => props.setElder(event.target.checked)}
                  data-testid='elder-checkbox'
                >
                  Elder
                </Checkbox>
              </Row.Column>
              <Row.Column>
                <Checkbox
                  id='hero'
                  checked={props.hero}
                  onChange={event => props.setHero(event.target.checked)}
                  data-testid='hero-checkbox'
                >
                  Hero
                </Checkbox>
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column style={{ justifyContent: 'center' }}>
                <button
                  type='button'
                  onClick={props.toggleAdvancedSearch}
                  className='ButtonAsLink'
                >
                  <Icon icon='search' className='CollectionFilters__icon' />{' '}
                  Advanced search
                </button>
              </Row.Column>
              <Row.Column>
                <button
                  onClick={props.resetFilters}
                  type='button'
                  className='ButtonAsLink'
                  data-testid='reset-btn'
                  disabled={isButtonDisabled(props)}
                >
                  <span className='CollectionFilters__icon CollectionFilters__icon--cross'>
                    &times;
                  </span>{' '}
                  Reset filters
                </button>
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
