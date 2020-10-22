import React from 'react'
import { TYPES, RARITIES, RACES } from '../../constants/game'
import Checkbox from '../Checkbox'
import Column from '../Column'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import Only from '../Only'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import capitalise from '../../helpers/capitalise'
import './index.css'

export default React.memo(function CollectionFilters(props) {
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
          <Column>
            <Row>
              <Column>
                <FactionSelect
                  value={props.faction}
                  onChange={event => props.setFaction(event.target.value)}
                  withNeutral
                  withAny
                  data-testid='faction-select'
                />
              </Column>
              <Column>
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
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column>
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
              </Column>
              <Column>
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
              </Column>
            </Row>
          </Column>
        </Row>

        <Row desktopOnly>
          <Column>
            <Row>
              <Column>
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
              </Column>
              <Column>
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
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column>
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
              </Column>
              <Column>
                <label htmlFor='text'>Name</label>
                <input
                  type='search'
                  name='text'
                  id='text'
                  value={props.text}
                  onChange={event => props.setText(event.target.value)}
                  placeholder='e.g. Faun'
                  data-testid='name-input'
                />
              </Column>
            </Row>
          </Column>
        </Row>

        <Row desktopOnly>
          <Column>
            <Row>
              <Column>
                <Checkbox
                  id='elder'
                  checked={props.elder}
                  onChange={event => props.setElder(event.target.checked)}
                  data-testid='elder-checkbox'
                >
                  Elder
                </Checkbox>
              </Column>
              <Column>
                <Checkbox
                  id='hero'
                  checked={props.hero}
                  onChange={event => props.setHero(event.target.checked)}
                  data-testid='hero-checkbox'
                >
                  Hero
                </Checkbox>
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column />
              <Column>
                <CTA
                  onClick={props.resetFilters}
                  type='button'
                  className='CollectionFilters__reset'
                  data-testid='reset-btn'
                  disabled={
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
                  }
                >
                  Reset filters
                </CTA>
              </Column>
            </Row>
          </Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
