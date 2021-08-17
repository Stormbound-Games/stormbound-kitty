import React from 'react'
import BrawlExport from '~/components/BrawlExport'
import BrawlImport from '~/components/BrawlImport'
import PremiumPassCheckbox from '~/components/PremiumPassCheckbox'
import Radio from '~/components/Radio'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import VisuallyHidden from '~/components/VisuallyHidden'

export default React.memo(function BrawlSetup(props) {
  return (
    <>
      <fieldset>
        <VisuallyHidden as='legend'>Setup</VisuallyHidden>
        <Radio
          name='setup'
          id='MOBILE_WITHOUT_ADS'
          value='MOBILE_WITHOUT_ADS'
          required
          checked={props.setup === 'MOBILE_WITHOUT_ADS'}
          onChange={event => props.setSetup(event.target.value)}
          extend={{ fontSize: '90%' }}
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
          Mobile with ads
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

      <PremiumPassCheckbox
        checked={props.withPremiumPass}
        onChange={event => props.setWithPremiumPass(event.target.checked)}
      />

      <Spacing top='LARGE'>
        <Row>
          <Row.Column>
            <BrawlImport />
          </Row.Column>
          <Row.Column>
            <BrawlExport />
          </Row.Column>
        </Row>
      </Spacing>
    </>
  )
})
