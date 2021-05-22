import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Info from '../Info'
import { Coins } from '../Resource'
import './index.css'

export default React.memo(function BrawlOutcome(props) {
  const { meta } = React.useContext(BrawlContext)
  const balance = props.income - meta.coinsSpent

  return (
    <Info icon='crown' className='BrawlOutcome' title='Balance'>
      <p>
        At this stage, this is the current balance for your Brawl performance:
      </p>
      <ul className='BrawlOutcome__list'>
        <li>
          <strong className='Highlight'>Milestone completed:</strong>{' '}
          {meta.milestone || 'none'}
        </li>
        <li>
          <strong style={{ color: 'var(--light-ironclad)' }}>
            Coins spent:
          </strong>{' '}
          <Coins amount={'-' + meta.coinsSpent} />
        </li>
        <li>
          <strong style={{ color: 'var(--light-shadowfen)' }}>
            Coins earned:
          </strong>{' '}
          <Coins amount={'+' + props.income} />
        </li>
        <li>
          <strong className='Highlight'>Balance:</strong>{' '}
          <Coins amount={balance} />
        </li>
      </ul>
    </Info>
  )
})
