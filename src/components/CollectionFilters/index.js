import React from 'react'
import { RARITIES } from '../../constants/game'
import Column from '../Column'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import Only from '../Only'
import Row from '../Row'
import capitalise from '../../helpers/capitalise'
import './index.css'

const CollectionFilters = props => (
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
        </Row>
      </Column>
      <Column>
        <Row>
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
        </Row>
      </Column>
    </Row>

    <Row desktopOnly>
      <Column>
        <Row>
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
          <Column>
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
          </Column>
        </Row>
      </Column>
      <Column>
        <Row>
          <Only.Desktop>
            <Column />
          </Only.Desktop>
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
                !props.name &&
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
)

export default CollectionFilters
