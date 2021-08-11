import React from 'react'
import { useFela } from 'react-fela'
import Radio from '../Radio'

export default React.memo(function BrawlCalculatorMode(props) {
  const { css } = useFela()
  return (
    <fieldset className={css({ marginBottom: '1.5em' })}>
      <legend>I want to find out…</legend>
      <Radio
        name='mode'
        id='coins'
        value='COINS'
        checked={props.mode === 'COINS'}
        onChange={event => props.setMode(event.target.value)}
        required
      >
        … how far I can go with my coins.
      </Radio>
      <Radio
        name='mode'
        id='goal'
        value='GOAL'
        checked={props.mode === 'GOAL'}
        onChange={event => props.setMode(event.target.value)}
        required
      >
        … how much reaching my goal costs.
      </Radio>
    </fieldset>
  )
})
