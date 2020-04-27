import React from 'react'
import Checkbox from '../Checkbox'
import ResetButton from '../ResetButton'
import './index.css'

const DryRunnerResetDialog = React.memo(props => (
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
  </ResetButton>
))

export default DryRunnerResetDialog
