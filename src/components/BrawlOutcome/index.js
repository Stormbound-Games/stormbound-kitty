import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '../BrawlProvider'
import Info from '../Info'
import { Coins } from '../Resource'
import styles from './styles'

export default React.memo(function BrawlOutcome(props) {
  const { css } = useFela()
  const { meta } = React.useContext(BrawlContext)
  const income = props.income || 0
  const balance = income - meta.coinsSpent

  return (
    <Info icon='crown' title='Balance'>
      <p>
        At this stage, this is the current balance for your Brawl performance:
      </p>
      <ul className={css(styles.list)}>
        <li>
          <strong className='Highlight'>Milestone completed:</strong>{' '}
          {meta.milestone || 'none'}
        </li>
        <li>
          <strong className={css({ color: 'var(--light-ironclad)' })}>
            Coins spent:
          </strong>{' '}
          <Coins amount={'-' + meta.coinsSpent} />
        </li>
        <li>
          <strong className={css({ color: 'var(--light-shadowfen)' })}>
            Coins earned:
          </strong>{' '}
          <Coins amount={'+' + income} />
        </li>
        <li>
          <strong className='Highlight'>Balance:</strong>{' '}
          <Coins amount={balance} />
        </li>
      </ul>
    </Info>
  )
})
