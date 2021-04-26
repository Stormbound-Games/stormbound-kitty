import React from 'react'
import Checkbox from '../Checkbox'
import './index.css'

export default React.memo(function BrawlCalculatorPremiumPassToggle(props) {
  return (
    <Checkbox
      className='BrawlCalculatorPremiumPassToggle'
      name='with-premium-pass'
      id='with-premium-pass'
      onChange={props.onChange}
      checked={props.checked}
    >
      Premium Pass
    </Checkbox>
  )
})
