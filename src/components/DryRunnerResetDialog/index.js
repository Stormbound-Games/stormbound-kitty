import React from 'react'
import Checkbox from '../Checkbox'
import ResetButton from '../ResetButton'
import './index.css'

export default React.memo(function DryRunnerResetDialog(props) {
  return (
    <ResetButton
      label='Reset game'
      confirm='Are you sure you want to reset the game? Don’t worry, you’ll keep your deck.'
      reset={props.reset}
    >
      <div className='DryRunnerResetDialog__checkbox'>
        <Checkbox
          name='equals-mode'
          id='equals-mode'
          data-testid='equals-mode'
          checked={props.equalsMode}
          onChange={event => props.setEqualsMode(event.target.checked)}
        >
          Reset in equal levels
        </Checkbox>
      </div>
      <label htmlFor='modifier'>Reset with modifier</label>
      <select
        name='modifier'
        id='modifier'
        value={props.modifier}
        onChange={event => {
          props.setModifier(event.target.value)
          console.log(event.target.value)
        }}
      >
        <option value='0'>None</option>
        <option value='1'>Structures = 2 mana</option>
        <option value='2'>Toads = 2 mana</option>
        <option value='3'>Knights -2 mana</option>
        <option value='4'>Dwarves -2 mana</option>
        <option value='5'>Spells -2 mana</option>
      </select>
    </ResetButton>
  )
})
