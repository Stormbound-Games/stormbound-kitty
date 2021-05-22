import React from 'react'
import Radio from '../Radio'
import './index.css'

export default React.memo(function BrawlCalculatorSetup(props) {
  return (
    <fieldset className='BrawlCalculatorSetup'>
      <legend>Coins</legend>
      <Radio
        name='setup'
        id='MOBILE_WITHOUT_ADS'
        value='MOBILE_WITHOUT_ADS'
        required
        checked={props.setup === 'MOBILE_WITHOUT_ADS'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Mobile (without watching ads)
      </Radio>
      <Radio
        name='setup'
        id='MOBILE_WITH_ADS'
        value='MOBILE_WITH_ADS'
        required
        checked={props.setup === 'MOBILE_WITH_ADS'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Mobile (while watching ads)
      </Radio>
      <Radio
        name='setup'
        id='STEAM'
        value='STEAM'
        required
        checked={props.setup === 'STEAM'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Steam
      </Radio>
      <Radio
        name='setup'
        id='NONE'
        value='NONE'
        required
        checked={props.setup === 'NONE'}
        onChange={event => props.setSetup(event.target.value)}
      >
        Ignore victory coins
      </Radio>
    </fieldset>
  )
})
