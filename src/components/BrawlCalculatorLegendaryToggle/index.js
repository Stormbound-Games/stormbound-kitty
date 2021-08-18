import React from 'react'
import Checkbox from '~/components/Checkbox'
import Spacing from '~/components/Spacing'

export default React.memo(function BrawlCalculatorLegendaryToggle(props) {
  if (props.mode !== 'GOAL' || props.milestone < 5) return null

  return (
    <Spacing bottom='BASE'>
      <Checkbox
        extend={{ color: 'var(--white)' }}
        id='legendary-level-5'
        onChange={props.onChange}
        checked={props.checked}
      >
        I have the legendary card level 5 already
      </Checkbox>
    </Spacing>
  )
})
