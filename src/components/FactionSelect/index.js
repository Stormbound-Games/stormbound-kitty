import React from 'react'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

export default React.memo(function FactionSelect(props) {
  return (
    <>
      <label htmlFor={props.id || 'faction'} className={props.labelClassName}>
        {props.label || 'Faction'}
      </label>
      <select
        form={props.form}
        name={props.name || 'faction'}
        id={props.id || 'faction'}
        required={props.required}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        data-testid={props['data-testid']}
      >
        {props.withAny && <option value='*'>{props.anyLabel || 'Any'}</option>}
        {props.withEmpty && (
          <option value=''>{props.emptyLabel || 'Pick a faction'}</option>
        )}
        {Object.keys(FACTIONS)
          .filter(faction => props.withNeutral || faction !== 'neutral')
          .map(faction => (
            <React.Fragment key={faction}>
              <option value={faction}>{capitalise(faction)}</option>
              {props.withExtendedVersions && faction !== 'neutral' && (
                <option value={'neutral,' + faction}>
                  {capitalise(faction)} + Neutral
                </option>
              )}
            </React.Fragment>
          ))}
      </select>
    </>
  )
})
