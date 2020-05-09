import React from 'react'
import { COIN_MULTIPLIERS } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import Info from '../Info'
import { Coins } from '../Resource'
import './index.css'

export default React.memo(function BrawlOutcome(props) {
  const { brawl, meta } = React.useContext(BrawlContext)
  const balance =
    meta.coinsSpent - brawl.matches.length * COIN_MULTIPLIERS[props.setup]

  return (
    <Info icon='crown' className='BrawlOutcome' title='Balance'>
      <p>
        At this stage, this is the current balance for your Brawl performance:
      </p>
      <ul className='BrawlOutcome__list'>
        <li>
          <strong className='Highlight'>Milestone reached:</strong> #
          {meta.milestone}
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
          <Coins
            amount={'+' + brawl.matches.length * COIN_MULTIPLIERS[props.setup]}
          />
        </li>
        <li>
          <strong className='Highlight'>Balance:</strong>{' '}
          <Coins amount={(balance > 0 ? '-' : '+') + balance} />
        </li>
      </ul>
    </Info>
  )
})
