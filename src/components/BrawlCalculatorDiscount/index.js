import React from 'react'
import NumberInput from '../NumberInput'

export default React.memo(function BrawlCalculatorDiscount(props) {
  return (
    <>
      <label htmlFor='discount'>Event-specific discount (%)</label>
      <NumberInput
        id='discount'
        name='discount'
        value={props.discount}
        onChange={props.setDiscount}
        min={0}
        max={100}
        placeholder='e.g. 50'
      />
    </>
  )
})
