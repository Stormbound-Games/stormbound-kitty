import React from 'react'
import Checkbox from '../Checkbox'
import { Coins } from '../Resource'
import './index.css'

export default React.memo(function BrawlCalculatorPremiumPassToggle(props) {
  return (
    <p className='BrawlCalculatorPremiumPassToggle'>
      <Checkbox
        name='with-premium-pass'
        id='with-premium-pass'
        onChange={props.onChange}
        checked={props.checked}
      >
        Premium Pass
      </Checkbox>
      <span style={{ marginTop: '-0.35em' }}>
        (extra coins per win, <Coins amount={700} /> cap,{' '}
        <a
          href='#multiple-discounts'
          aria-describedby='footnotes'
          id='multiple-discounts-ref'
          style={{ textDecoration: 'none', display: 'inline' }}
        >
          10% Brawl discount
          {props.withFootnote && (
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
    </p>
  )
})
