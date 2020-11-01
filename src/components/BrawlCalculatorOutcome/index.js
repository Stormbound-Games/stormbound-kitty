import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import { Coins, Crowns } from '../Resource'
import { MILESTONES, COIN_MULTIPLIERS } from '../../constants/brawl'
import getMilestoneIndexFromCoins from '../../helpers/getMilestoneIndexFromCoins'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getCostForMilestone from '../../helpers/getCostForMilestone'
import getMilestoneForCrowns from '../../helpers/getMilestoneForCrowns'
import './index.css'

const BrawlCalculatorRewards = React.memo(function BrawlCalculatorRewards(
  props
) {
  const info = getMilestoneForCrowns(props.crowns)

  return (
    <ol className='BrawlCalculatorOutcome__rewards' start={info.nextIndex + 1}>
      {MILESTONES.slice(info.nextIndex, props.milestone + 1).map(
        (milestone, index) => (
          <li key={milestone.crowns}>{getBrawlRewardLabel(milestone, true)}</li>
        )
      )}
    </ol>
  )
})

export default React.memo(function BrawlCalculatorOutcome(props) {
  const { mode, crowns, coins, milestone, winRate, setup, discount } = props
  const options = [crowns, winRate / 100, 1 - discount / 100, setup]
  const info = getMilestoneForCrowns(crowns)
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

  // If `nextIndex` is `-1`, it means we have too many crowns for the entire
  // Brawl, and have already finished it entirely, therefore there is nothing
  // else to do.
  if (info.nextIndex === -1) {
    return (
      <p>
        With <Crowns amount={crowns} />, you have already reached milestone #
        {MILESTONES.length}. Set less than 250 crowns to use the calculator.
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

    const reachableIndex = getMilestoneIndexFromCoins(coins, ...options)

    // If the reachable milestone with the available coins is the same as the
    // current milestone, it means there are not enough coins to reach said
    // milestone.
    if (info.currentIndex === reachableIndex) {
      return (
        <p>
          Starting at <Crowns amount={crowns} />, with <Coins amount={coins} />{' '}
          ({gains}) and accounting for a {winRate}% win rate, you unfortunately
          cannot reach a next milestone.
        </p>
      )
    }

    const next =
      reachableIndex < MILESTONES.length - 1
        ? getCostForMilestone(reachableIndex + 1, ...options)
        : null
    const nextUp = next ? Math.round(Math.round(next) / 5) * 5 : null

    return (
      <>
        <p>
          Starting at <Crowns amount={crowns} />, with <Coins amount={coins} />{' '}
          ({gains}) and accounting for a {winRate}% win rate, you can expect
          reaching{' '}
          <span className='Highlight'>milestone #{reachableIndex + 1}</span>,
          and get the following rewards:
        </p>

        <BrawlCalculatorRewards
          crowns={props.crowns}
          milestone={reachableIndex}
        />

        {next ? (
          <>
            <p>
              Reaching the next milestone (milestone #{reachableIndex + 2},
              yielding{' '}
              {getBrawlRewardLabel(MILESTONES[reachableIndex + 1], true)}) would
              cost <Coins amount={nextUp} />, or an{' '}
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
          Starting at <Crowns amount={crowns} />, reaching milestone #
          {milestone + 1} ({reward}) and accounting for a {winRate}% win rate
          would{' '}
          <span className='Highlight'>
            cost <Coins amount={outcomeUp} />
          </span>{' '}
          ({gains}). Here are all the rewards you would get:
        </p>
        <BrawlCalculatorRewards crowns={crowns} milestone={milestone} />
      </>
    )
  }

  return null
})
