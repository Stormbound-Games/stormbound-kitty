import React from 'react'
import Select from '../Select'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

export default React.memo(function FactionSelect({
  anyLabel,
  emptyLabel,
  withAny,
  withEmpty,
  withExtendedVersions,
  withNeutral,
  ...props
}) {
  const label = props.label || 'Faction'
  const id = props.id || 'faction'

  return (
    <Select {...props} label={label} id={id}>
      {withAny && <option value='*'>{anyLabel || 'Any'}</option>}
      {withEmpty && <option value=''>{emptyLabel || 'Pick a faction'}</option>}
      {Object.keys(FACTIONS)
        .filter(faction => withNeutral || faction !== 'neutral')
        .map(faction => (
          <React.Fragment key={faction}>
            <option value={faction}>{capitalise(faction)}</option>
            {withExtendedVersions && faction !== 'neutral' && (
              <option value={'neutral,' + faction}>
                {capitalise(faction)} + Neutral
              </option>
            )}
          </React.Fragment>
        ))}
    </Select>
  )
})
