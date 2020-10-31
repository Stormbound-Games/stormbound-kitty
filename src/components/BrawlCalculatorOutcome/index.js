import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import { Coins } from '../Resource'
import { MILESTONES, COIN_MULTIPLIERS } from '../../constants/brawl'
import getMilestoneIndexFromCoins from '../../helpers/getMilestoneIndexFromCoins'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getCostForMilestone from '../../helpers/getCostForMilestone'
import './index.css'

const BrawlCalculatorRewards = React.memo(function BrawlCalculatorRewards(
  props
) {
  return (
    <ol className='BrawlCalculatorOutcome__rewards'>
      {MILESTONES.slice(0, props.milestone + 1).map((milestone, index) => (
        <li key={milestone.crowns}>{getBrawlRewardLabel(milestone, true)}</li>
      ))}
    </ol>
  )
})

export default React.memo(function BrawlCalculatorOutcome(props) {
  const { mode, coins, milestone, winRate, setup, discount } = props
  const options = [winRate / 100, 1 - discount / 100, setup]
  const gains =
    setup === 'NONE' ? (
      'without considering winning gain'
    ) : (
      <>
        considering <Coins amount={COIN_MULTIPLIERS[setup]} /> per win until
        coin cap
      </>
    )

  if (!mode) {
    return (
      <p>
        Start by deciding whether you want to reach a certain milestone or
        contribute with a certain amount of coins. Then, fill the remaining
        options to let the calculator come up with a result.
      </p>
    )
  }

  if (mode === 'COINS') {
    if (!coins) {
      return (
        <p>
          You must define how many coins you are willing to spend for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const outcome = getMilestoneIndexFromCoins(coins, ...options)
    const next =
      outcome < MILESTONES.length - 1
        ? getCostForMilestone(outcome + 1, ...options)
        : null
    const nextUp = next ? Math.round(Math.round(next) / 5) * 5 : null

    return (
      <>
        <p>
          With <Coins amount={coins} /> ({gains}) and accounting for a {winRate}
          % win rate, you can expect reaching{' '}
          <span className='Highlight'>milestone #{outcome + 1}</span>, and get
          the following rewards:
        </p>
        <BrawlCalculatorRewards milestone={outcome} />
        {next ? (
          <>
            <p>
              Reaching the next milestone (milestone #{outcome + 2}, yielding{' '}
              {getBrawlRewardLabel(MILESTONES[outcome + 2], true)}) would cost{' '}
              <Coins amount={nextUp} />, or an{' '}
              <span className='Highlight'>
                extra <Coins amount={nextUp - coins} />
              </span>
              .
            </p>
            <Info icon='equalizer' title='Income calculator'>
              To figure out how much coins you can earn in a given period of
              time, check out the{' '}
              <Link to='/calculators/income'>income calculator</Link>.
            </Info>
          </>
        ) : null}
      </>
    )
  }

  if (mode === 'GOAL') {
    if (milestone === '') {
      return (
        <p>
          You must define which milestone you are wishing to reach for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const outcome = getCostForMilestone(milestone, ...options)
    const outcomeUp = Math.round(Math.round(outcome) / 5) * 5
    const reward = getBrawlRewardLabel(MILESTONES[milestone], true)

    return (
      <>
        <p>
          Reaching milestone #{milestone + 1} ({reward}) and accounting for a{' '}
          {winRate}% win rate would{' '}
          <span className='Highlight'>
            cost <Coins amount={outcomeUp} />
          </span>{' '}
          ({gains}). Here are all the rewards you would get:
        </p>
        <BrawlCalculatorRewards milestone={milestone} />
      </>
    )
  }

  return null
})
