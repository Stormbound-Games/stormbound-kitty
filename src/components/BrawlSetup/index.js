import React from 'react'
import BrawlExport from '../BrawlExport'
import BrawlImport from '../BrawlImport'
import Radio from '../Radio'
import Row from '../Row'
import './index.css'

export default React.memo(function BrawlSetup(props) {
  return (
    <div className='BrawlSetup'>
      <fieldset>
        <legend className='VisuallyHidden'>Setup</legend>
        <Row>
          <Row.Column
            width='1/3'
            style={{ justifyContent: 'center' }}
            align='center'
          >
            <Radio
              name='setup'
              id='MOBILE_WITHOUT_ADS'
              value='MOBILE_WITHOUT_ADS'
              required
              checked={props.setup === 'MOBILE_WITHOUT_ADS'}
              onChange={event => props.setSetup(event.target.value)}
            >
              Mobile <br />
              (w/o ads)
            </Radio>
          </Row.Column>
          <Row.Column
            width='1/3'
            style={{ justifyContent: 'center' }}
            align='center'
          >
            <Radio
              name='setup'
              id='MOBILE_WITH_ADS'
              value='MOBILE_WITH_ADS'
              required
              checked={props.setup === 'MOBILE_WITH_ADS'}
              onChange={event => props.setSetup(event.target.value)}
            >
              Mobile <br />
              (w/ ads)
            </Radio>
          </Row.Column>
          <Row.Column
            width='1/3'
            style={{ justifyContent: 'center' }}
            align='center'
          >
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
          </Row.Column>
        </Row>
      </fieldset>
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
