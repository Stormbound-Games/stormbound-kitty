import React from 'react'
import { useFela } from 'react-fela'
import Checkbox from '../Checkbox'
import Spacing from '../Spacing'
import { Coins } from '../Resource'
import styles from './styles'

export default React.memo(function BrawlCalculatorPremiumPassToggle(props) {
  const { css } = useFela()

  return (
    <Spacing bottom='BASE'>
      <p className={css(styles.toggle)}>
        <Checkbox
          id='with-premium-pass'
          onChange={props.onChange}
          checked={props.checked}
          extend={styles.checkbox}
        >
          Premium Pass
        </Checkbox>
        <span className={css({ marginTop: '-0.35em' })}>
          (extra coins per win, <Coins amount={700} /> cap, 10% extra Brawl
          discount
        </span>
      </p>
    </Spacing>
  )
})
