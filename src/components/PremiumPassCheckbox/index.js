import React from 'react'
import Checkbox from '../Checkbox'
import { Coins } from '../Resource'

export default React.memo(function PremiumPassCheckbox({
  withExplanation = true,
  withFootnote = false,
  ...props
}) {
  return (
    <>
      <Checkbox
        name={props.name || 'withPremiumPass'}
        id={props.id || 'withPremiumPass'}
        onChange={props.onChange}
        checked={props.checked}
      >
        Premium Pass
      </Checkbox>
      {withExplanation && (
        <span style={{ marginTop: '-0.35em' }}>
          (extra coins per win, <Coins amount={700} /> cap, 10% extra Brawl
          discount
        </span>
      )}
    </>
  )
})
