import React from 'react'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

export default React.memo(function FactionSelect(props) {
  return (
    <>
      <label htmlFor={props.id || 'faction'}>Faction</label>
      <select
        name={props.name || 'faction'}
        id={props.id || 'faction'}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        data-testid={props['data-testid']}
      >
        {props.withAny && <option value='*'>Any</option>}
        {Object.keys(FACTIONS)
          .filter(faction => props.withNeutral || faction !== 'neutral')
          .map(faction => (
            <option value={faction} key={faction}>
              {capitalise(faction)}
            </option>
          ))}
      </select>
    </>
  )
})
