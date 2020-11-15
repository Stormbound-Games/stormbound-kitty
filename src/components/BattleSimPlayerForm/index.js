import React from 'react'
import FactionSelect from '../FactionSelect'
import NumberInput from '../NumberInput'
import Row from '../Row'

export default React.memo(function BattleSimPlayerForm(props) {
  return (
    <div className='BattleSimPlayerForm'>
      <Row>
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
          <label
            className='BattleSimPlayerForm__label'
            htmlFor={`health-${props.player}`}
          >
            {props.player} Health
          </label>
          <NumberInput
            name={`health-${props.player}`}
            id={`health-${props.player}`}
            value={props.health}
            onChange={health =>
              props.update({ health, faction: props.faction })
            }
            required
            min={1}
            max={99}
            data-testid={`${props.player}-health-input`}
          />
        </Row.Column>
      </Row>
    </div>
  )
})
