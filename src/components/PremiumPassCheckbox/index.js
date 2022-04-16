import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '~/components/Checkbox'
import { Coins } from '~/components/Resource'

export default React.memo(function PremiumPassCheckbox({
  withExplanation = true,
  ...props
}) {
  const { css } = useFela()

  return (
    <>
      <Checkbox
        name={props.name}
        id={props.id || 'withPremiumPass'}
        onChange={props.onChange}
        checked={props.checked}
      >
        Premium Pass
        {withExplanation && (
          <>
            {' '}
            <span className={css({ marginTop: '-0.35em' })}>
              (extra coins per win, <Coins amount={700} /> cap, 10% extra Brawl
              discount
            </span>
          </>
        )}
      </Checkbox>
    </>
  )
})
