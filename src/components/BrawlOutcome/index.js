import React from 'react'
import { MILESTONES } from '../../constants/brawl'
import { BrawlContext } from '../BrawlProvider'
import Info from '../Info'
import { Coins } from '../Resource'
import './index.css'

const MULTIPLIERS = {
  STEAM: 10,
  MOBILE_WITH_ADS: 20,
  MOBILE_WITHOUT_ADS: 5,
}

export default React.memo(function BrawlOutcome(props) {
  const { brawl } = React.useContext(BrawlContext)

  const coinsSpent = (() => {
    let crowns = 0
    let currentMilestone = 0

    return brawl.matches.reduce((acc, match) => {
      const gameCost = MILESTONES[currentMilestone].cost
      acc += gameCost
      crowns += match.status === 'WIN' ? 5 : 1
      currentMilestone = MILESTONES.findIndex(
        milestone => milestone.crowns > crowns
      )

      return acc
    }, 0)
  })()
  const balance = coinsSpent - brawl.matches.length * MULTIPLIERS[props.setup]

  return (
    <Info className='BrawlOutcome' title='Balance'>
      <p>
        At this stage, this is the current balance for your Brawl performance:
      </p>
      <ul className='BrawlOutcome__list'>
        <li>
          <strong style={{ color: 'var(--light-ironclad)' }}>
            Coins spent:
          </strong>{' '}
          <Coins amount={'-' + coinsSpent} />
        </li>
        <li>
          <strong style={{ color: 'var(--light-shadowfen)' }}>
            Coins earned:
          </strong>{' '}
          <Coins
            amount={'+' + brawl.matches.length * MULTIPLIERS[props.setup]}
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
