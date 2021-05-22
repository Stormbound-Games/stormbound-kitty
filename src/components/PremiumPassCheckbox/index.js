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
          (<Coins amount={20} /> per win, <Coins amount={700} /> cap,{' '}
          <a
            href='#multiple-discounts'
            aria-describedby='footnotes'
            id='multiple-discounts-ref'
            style={{ textDecoration: 'none', display: 'inline' }}
          >
            10% Brawl discount
            {withFootnote && (
              <span
                style={{
                  color: 'var(--beige)',
                  marginLeft: '2px',
                  fontSize: '120%',
                }}
              >
                *
              </span>
            )}
          </a>
          )
        </span>
      )}
    </>
  )
})
