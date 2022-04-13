import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '~/components/BrawlProvider'
import Info from '~/components/Info'
import { Coins } from '~/components/Resource'
import styles from './styles'

export default React.memo(function BrawlOutcome(props) {
  const { css } = useFela()
  const { meta } = React.useContext(BrawlContext)
  const income = props.income || 0
  const balance = income - meta.coinsSpent

  return (
    <Info icon='crown' title='Balance' spacing={{ top: 'SMALL' }}>
      <p>
        At this stage, this is the current balance for your Brawl performance:
      </p>
      <ul className={css(styles.list)}>
        <li>
          <span className='Highlight'>Milestone completed:</span>{' '}
          {meta.milestone || 'none'}
        </li>
        <li>
          <span className={css({ color: 'var(--light-ironclad)' })}>
            Coins spent:
          </span>{' '}
          <Coins amount={'-' + meta.coinsSpent} />
        </li>
        <li>
          <span className={css({ color: 'var(--light-shadowfen)' })}>
            Coins earned:
          </span>{' '}
          <Coins amount={'+' + income} />
        </li>
        <li>
          <span className='Highlight'>Balance:</span> <Coins amount={balance} />
        </li>
      </ul>
    </Info>
  )
})
