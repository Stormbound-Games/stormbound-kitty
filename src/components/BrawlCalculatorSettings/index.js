import React from 'react'
import Column from '../Column'
import Row from '../Row'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import { MILESTONES } from '../../constants/brawl'

export default React.memo(function BrawlCalculatorSettings(props) {
  const { setMilestone } = props

  React.useEffect(() => {
    const current = MILESTONES.findIndex(
      milestone => milestone.crowns > props.crowns
    )
    // If the amount of obtained crowns changes and end up being the equivalent
    // of a milestone higher than or equal to the one aimed at, reset the
    // expected milestone.
    if (current > props.milestone) setMilestone('')
  }, [props.crowns, props.milestone, setMilestone])

  return (
    <>
      <Row>
        <Column>
          <label htmlFor='winRate'>Win rate (%)</label>
          <input
            id='winRate'
            name='winRate'
            type='number'
            value={props.winRate}
            onChange={event => props.setWinRate(+event.target.value)}
            min={1}
            max={100}
            placeholder='e.g. 50'
            onBlur={event => {
              if (+event.target.value < 1) props.setWinRate(1)
              if (+event.target.value > 100) props.setWinRate(100)
            }}
          />
        </Column>
        <Column>
          <label htmlFor='crowns'>Crowns</label>
          <input
            id='crowns'
            name='crowns'
            type='number'
            value={props.crowns}
            onChange={event => props.setCrowns(+event.target.value)}
            min={0}
            max={250}
            placeholder='e.g. 5'
            onBlur={event => {
              if (+event.target.value < 0) props.setCrowns(0)
              if (+event.target.value > 250) props.setCrowns(250)
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          {props.mode === 'COINS' ? (
            <>
              <label htmlFor='coins'>Coins</label>
              <input
                id='coins'
                name='coins'
                type='number'
                value={props.coins}
                onChange={event => props.setCoins(+event.target.value)}
                min={5}
                step={5}
                placeholder='e.g. 700'
              />
            </>
          ) : props.mode === 'GOAL' ? (
            <>
              <label htmlFor='milestone'>Milestone</label>
              <select
                name='milestone'
                id='milestone'
                value={props.milestone}
                onChange={event => props.setMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {MILESTONES.map((milestone, index) => (
                  <option
                    key={milestone.crowns}
                    value={index}
                    disabled={milestone.crowns <= props.crowns}
                  >
                    {index + 1}. {getBrawlRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </Column>
      </Row>
    </>
  )
})
