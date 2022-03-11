import React from 'react'
import Select from '~/components/Select'
import { FACTIONS } from '~/constants/game'
import capitalize from '~/helpers/capitalize'

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
      {FACTIONS.filter(faction => withNeutral || faction !== 'neutral').map(
        faction => (
          <React.Fragment key={faction}>
            <option value={faction}>{capitalize(faction)}</option>
            {withExtendedVersions && faction !== 'neutral' && (
              <option value={'neutral,' + faction}>
                {capitalize(faction)} + Neutral
              </option>
            )}
          </React.Fragment>
        )
      )}
    </Select>
  )
})
