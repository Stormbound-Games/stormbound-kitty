import React from 'react'
import Select from '../Select'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

export default React.memo(function FactionSelect(props) {
  const label = props.label || 'Faction'
  const id = props.id || 'faction'

  return (
    <Select
      hideLabel={props.hideLabel}
      label={label}
      form={props.form}
      name={props.name || id}
      id={id}
      required={props.required}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      data-testid={props['data-testid']}
      className={props.className}
      extend={props.extend}
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
    </Select>
  )
})
