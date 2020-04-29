import React from 'react'
import Checkbox from '../Checkbox'
import DryRunnerEqualsMode from '../DryRunnerEqualsMode'
import DryRunnerRNGField from '../DryRunnerRNGField'
import Title from '../Title'
import './index.css'

export default React.memo(function DryRunnerSettings(props) {
  return (
    <div className='DryRunnerSettings'>
      <Title>Settings</Title>

      <Checkbox
        className='DryRunnerSettings__display-chance'
        name='display-chance'
        id='display-chance'
        checked={props.displayChance}
        onChange={event => props.setDisplayChance(event.target.checked)}
        data-testid='display-chance'
      >
        Drawing odds
        <span className='DryRunnerSettings__info'>
          {props.displayChance
            ? 'Hide drawing odds from the deck'
            : 'Display drawing odds in the deck'}
        </span>
      </Checkbox>

      <DryRunnerEqualsMode
        equalsMode={props.equalsMode}
        setEqualsMode={props.setEqualsMode}
      />

      <DryRunnerRNGField
        RNG={props.RNG}
        setRNG={props.setRNG}
        deck={props.deck}
      />
    </div>
  )
})
