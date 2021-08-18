import React from 'react'
import NumberInput from '~/components/NumberInput'

export default React.memo(function BrawlCalculatorDiscount(props) {
  return (
    <NumberInput
      label='Event-specific discount (%)'
      id='discount'
      name='discount'
      value={props.discount}
      onChange={props.setDiscount}
      min={0}
      max={100}
      placeholder='e.g. 50'
    />
  )
})
