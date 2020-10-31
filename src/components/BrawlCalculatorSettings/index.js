import React from 'react'
import Column from '../Column'
import Row from '../Row'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import { MILESTONES } from '../../constants/brawl'

export default React.memo(function BrawlCalculatorSettings(props) {
  return (
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
        />
      </Column>
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
                <option key={milestone.crowns} value={index}>
                  {index + 1}. {getBrawlRewardLabel(milestone)}
                </option>
              ))}
            </select>
          </>
        ) : null}
      </Column>
    </Row>
  )
})
