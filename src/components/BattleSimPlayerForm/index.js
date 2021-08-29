import React from 'react'
import FactionSelect from '~/components/FactionSelect'
import NumberInput from '~/components/NumberInput'
import Row from '~/components/Row'

export default React.memo(function BattleSimPlayerForm(props) {
  return (
    <Row withNarrowGutter>
      <Row.Column width='2/3'>
        <FactionSelect
          name={`faction-${props.player}`}
          id={`faction-${props.player}`}
          required
          onChange={event =>
            props.update({
              faction: event.target.value,
              health: props.health,
            })
          }
          value={props.faction || ''}
          data-testid={`${props.player}-faction-select`}
          withNeutral
        />
      </Row.Column>
      <Row.Column width='1/3'>
        <NumberInput
          label={`${props.player} Health`}
          name={`health-${props.player}`}
          id={`health-${props.player}`}
          value={props.health}
          onChange={health => props.update({ health, faction: props.faction })}
          required
          min={1}
          max={99}
          data-testid={`${props.player}-health-input`}
        />
      </Row.Column>
    </Row>
  )
})
