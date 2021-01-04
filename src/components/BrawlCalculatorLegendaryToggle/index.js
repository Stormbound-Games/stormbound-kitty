import React from 'react'
import Checkbox from '../Checkbox'
import './index.css'

export default React.memo(function BrawlCalculatorLegendaryToggle(props) {
  if (props.mode !== 'GOAL' || props.milestone < 5) return null

  return (
    <Checkbox
      className='BrawlCalculatorLegendaryToggle'
      name='legendary-level-5'
      id='legendary-level-5'
      onChange={props.onChange}
      checked={props.checked}
    >
      I have the legendary card level 5 already
    </Checkbox>
  )
})
