import React from 'react'
import Row from '../Row'
import Column from '../Column'
import CTA from '../CTA'
import FactionSelect from '../FactionSelect'
import { RARITIES } from '../../constants/game'
import capitalise from '../../helpers/capitalise'
import './index.css'

const DBCollectionFilters = props => (
  <form
    className='DBCollectionFilters'
    onSubmit={event => event.preventDefault()}
  >
    <Row desktopOnly>
      <Column width={25}>
        <FactionSelect
          value={props.faction}
          onChange={event => props.setFaction(event.target.value)}
          withNeutral
          withAny
        />
      </Column>

      <Column width={25}>
        <label htmlFor='status'>Status</label>
        <select
          name='status'
          id='status'
          value={props.status}
          onChange={event => props.setStatus(event.target.value)}
        >
          <option value='*'>Any</option>
          <option value='MISSING'>Missing</option>
          <option value='UPGRADABLE'>Upgradable</option>
          <option value='EXCESS'>Excess</option>
        </select>
      </Column>

      <Column width={25}>
        <label htmlFor='level'>Level</label>
        <select
          name='level'
          id='level'
          value={props.level}
          onChange={event => props.setLevel(event.target.value)}
        >
          <option value='*'>Any</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </Column>

      <Column width={25}>
        <label htmlFor='rarity'>Rarity</label>
        <select
          name='rarity'
          id='rarity'
          value={props.rarity}
          onChange={event => props.setRarity(event.target.value)}
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

    <Row desktopOnly>
      <Column width={25}>
        <label htmlFor='text'>Name</label>
        <input
          type='search'
          name='text'
          id='text'
          value={props.text}
          onChange={event => props.setText(event.target.value)}
          placeholder='e.g. Faun'
        />
      </Column>
      <Column width={25} />
      <Column width={25} />
      <Column width={25}>
        <CTA
          onClick={props.resetFilters}
          type='button'
          className='DBCollectionFilters__reset'
        >
          Reset filters
        </CTA>
      </Column>
    </Row>
  </form>
)

export default DBCollectionFilters
