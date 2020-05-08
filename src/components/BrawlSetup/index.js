import React from 'react'
import Column from '../Column'
import Radio from '../Radio'
import Row from '../Row'
import './index.css'

export default React.memo(function BrawlSetup(props) {
  return (
    <fieldset className='BrawlSetup'>
      <legend className='VisuallyHidden'>Setup</legend>
      <Row>
        <Column width='1/3' style={{ justifyContent: 'center' }} align='center'>
          <Radio
            name='setup'
            id='MOBILE_WITHOUT_ADS'
            value='MOBILE_WITHOUT_ADS'
            required
            checked={props.setup === 'MOBILE_WITHOUT_ADS'}
            onChange={event => props.setSetup(event.target.value)}
          >
            Mobile <br />
            (w/ ads)
          </Radio>
        </Column>
        <Column width='1/3' style={{ justifyContent: 'center' }} align='center'>
          <Radio
            name='setup'
            id='MOBILE_WITH_ADS'
            value='MOBILE_WITH_ADS'
            required
            checked={props.setup === 'MOBILE_WITH_ADS'}
            onChange={event => props.setSetup(event.target.value)}
          >
            Mobile <br />
            (w/o ads)
          </Radio>
        </Column>
        <Column width='1/3' style={{ justifyContent: 'center' }} align='center'>
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
        </Column>
      </Row>
    </fieldset>
  )
})
