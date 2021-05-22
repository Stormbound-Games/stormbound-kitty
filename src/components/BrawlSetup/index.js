import React from 'react'
import BrawlExport from '../BrawlExport'
import BrawlImport from '../BrawlImport'
import PremiumPassCheckbox from '../PremiumPassCheckbox'
import Radio from '../Radio'
import Row from '../Row'
import './index.css'

export default React.memo(function BrawlSetup(props) {
  return (
    <div className='BrawlSetup'>
      <fieldset>
        <legend className='VisuallyHidden'>Setup</legend>
        <Radio
          name='setup'
          id='MOBILE_WITHOUT_ADS'
          value='MOBILE_WITHOUT_ADS'
          required
          checked={props.setup === 'MOBILE_WITHOUT_ADS'}
          onChange={event => props.setSetup(event.target.value)}
        >
          Mobile without ads
        </Radio>
        <Radio
          name='setup'
          id='MOBILE_WITH_ADS'
          value='MOBILE_WITH_ADS'
          required
          checked={props.setup === 'MOBILE_WITH_ADS'}
          onChange={event => props.setSetup(event.target.value)}
        >
          Mobile with ads or Premium Pass
        </Radio>
        <Radio
          name='setup'
          id='STEAM_OR_WEB'
          value='STEAM_OR_WEB'
          required
          checked={props.setup === 'STEAM_OR_WEB'}
          onChange={event => props.setSetup(event.target.value)}
        >
          Steam or web version
        </Radio>
      </fieldset>

      <PremiumPassCheckbox
        checked={props.withPremiumPass}
        onChange={event => props.setWithPremiumPass(event.target.checked)}
      />

      <Row>
        <Row.Column>
          <BrawlImport />
        </Row.Column>
        <Row.Column>
          <BrawlExport />
        </Row.Column>
      </Row>
    </div>
  )
})
